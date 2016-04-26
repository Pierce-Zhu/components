'use strict';

var client = require('util-restify');
var _cardType = require('../../lib/cardtype').type;
var auth = require('../../lib/auth');
var cipher = require('util-cipher');
var uid = require('uid2');
var async = require('async');
var moment = require('moment');
var captcha = require('util-captcha');
var random = require('../../lib/random');
var sms = require('util-sms');
var log4js = require('log4js');
var logger = log4js.getLogger();


var defaultPaypwd = 'MDEyMzQ1';
var page_num = 5;

function user_info(req, res, next) {
	res.locals._ic = !!req.session.name;
	res.locals._wechat = !!req.session.wechat;
	res.locals._card = !!req.session.card;
	next();
};

module.exports = function(router) {

	router.get('/login', function(req, res) {
		res.locals._m_type = 'login';
		res.render('login/login');
	});

	router.post('/login', function(req, res) {
		var bt = new Date().getTime();   //时间戳
		logger.info('router in ... /login/login'); 
		var data = req.body;
		var data_ = {
			mobile: data.mobile,
			passwd: cipher.md5['+'](data.pwd)
		};

		client.post_form('/user/login', data_, function(er, rq, res_, rs) {
			if(er){
				logger.error("login err.",er);
			}
			if (rs.code === 0) {
				req.session.user = rs.value.userId;
				req.session.mobile = rs.value.mobile;
				res.redirect('/login/setting');
			} else {
				res.locals._m_type = 'login';
				res.render('login/login', {
					error: '用户名或密码错误'
				});
				return false;
			}
			logger.info('login time>>',new Date().getTime() - bt);
		});
	});

	router.get('/register', function(req, res) {
		res.locals._m_type = 'register';
		res.render('login/login', {
			referee: req.query.referee
		});
	});

	router.post('/register', function(req, res) {
		var bt = new Date().getTime();   //时间戳
		logger.info('router in ... /login/register'); 
		var data = req.body;

		if (!req.session.register || req.session.register.mobile !== data.mobile || req.session.register.checkcode !== data.checkcode) {
			res.locals._m_type = 'register';
			res.render('login/login', {
				error: '验证码错误，请输入手机收到的验证码'
			});
			return false;
		}
		req.session.register = null;
		var data_ = {
			mobile: data.mobile,
			passwd: cipher.md5['+'](data.pwd),
			referee: data.referee,
			termimal: '3'
		};

		client.post_form('/user', data_, function(er, rq, res_, rs) {
			if(er){
				logger.error("register err.",er);
			}
			if (rs.code === 0) {
				req.session.user = rs.value.userId;
				req.session.mobile = rs.value.mobile;
				// res.redirect('/login/setting');
				res.redirect('/process/reg_success?userId='+rs.value.userId);
			} else {
				res.locals._m_type = 'register';
				res.render('login/login', {
					error: rs.detail
				});
				return false;
			}
			logger.info('register time>>',new Date().getTime() - bt);
		});

	});

	router.get('/forgot_pwd', function(req, res) {
		res.render('login/forgot_pwd');
	});

	router.post('/forgot_pwd', function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/forgot_pwd'); 
		var data = req.body;
		if (!req.session.register || req.session.register.mobile !== data.mobile || req.session.register.checkcode !== data.checkcode) {
			res.render('login/forgot_pwd', {
				error: '验证码错误，请输入手机收到的验证码'
			});
			return false;
		}
	
		req.session.register = null;
		var _data = {
			newPasswd: cipher.md5['+'](data.pwd)
		};

		client.put_form('/user/' + data.mobile + '/pwd', _data, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			if (rs.code === 0) {
				res.render('process/rs', {
					time: 3,
					err: '密码重置成功，即将跳转登陆页面',
					cb: '/login/login'
				});
			} else {
				res.render('process/rs', {
					err: rs.detail,
					cb: '/login/forgot_pwd'
				});
			}
			logger.info('handle time>>',new Date().getTime() - bt);
		});
	});

	router.get('/cc', function(req, res) {
		if (!req.session._cc_pic_mobile || req.session._cc_pic_mobile.code != req.query.cc_image) {
          res.send({
            no: -1,
            detail: '图片验证码错误'
          });
          return false;
        }

		var checkcode = random.v_code();
		// var checkcode = '123456';
		sms.send(req.query.mobile, 'zc', {
			code: checkcode
		}, function(err, v) {
			if (err) logger.error("err",err);
			logger.debug(v);
			logger.debug('发送短信(checkcode): ' + checkcode);
		});
		req.session.register = {
			mobile: req.query.mobile,
			checkcode: checkcode //checkcode
		};
		res.send({
			no: 0
		});
	});

	
	// router.get('/pay_pwd', auth.need_login, function(req, res) {
	// 	res.render('login/pay_pwd');
	// });

	//支付密码设置
	router.post('/pay_pwd', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/pay_pwd'); 
		var data = req.body;
		var _data = {
			newPasswd: data.paypwd
		};

		client.put_form('/user/' + req.session.user + '/paypwd', _data, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			if (rs.code === 0) {
				// req.session.info.userMoney.payPasswd = rs.value.payPasswd;
				req.session.payPasswd = rs.value.payPasswd;
				// req.session._pay_pwd = false;
				res.render('process/rs', {
					time: 3,
					err: "设置支付密码成功",
					cb: '/login/setting'
				});
			} else {
				res.locals._pay_pwd = req.session.payPasswd == defaultPaypwd;
				res.render('process/rs', {
					err: rs.detail,
					cb: '/login/setting'
				});
			}
			logger.info('handle time>>',new Date().getTime() - bt);
		});
	});

	//支付密码修改
	router.post('/mdi_pay_pwd', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/mdi_pay_pwd'); 
		var data = req.body;
		var _data = {
			passwd: data.paypwd,
			newPasswd: data.npaypwd
		};

		client.put_form('/user/' + req.session.user + '/paypwd', _data, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			if (rs.code === 0) {
				// req.session.info.userMoney.payPasswd = rs.value.payPasswd;
				req.session.payPasswd = rs.value.payPasswd;
				res.render('process/rs', {
					time: 3,
					err: "修改支付密码成功",
					cb: '/login/setting'
				});
			} else {
				res.locals._pay_pwd = req.session.payPasswd == defaultPaypwd;
				res.render('process/rs', {
					err: rs.detail,
					cb: '/login/setting'
				});
			}
		});
		logger.info('handle time>>',new Date().getTime() - bt);
	});

	router.get('/card_cc', auth.need_login, function(req, res) {
		client.get('/user/authcode/' + req.query.mobile, null, function(er, rq, rs, data) {
			res.send({
				code: data.code
			});
		});
	});

	router.get('/dt',function(req,res){
		client.get('/user/1b030cd80e354fe686091a7765c994bd', null, function(er, rq, res_, data) {
			var cards = data.userMoney.cards || {};
			var _card = [];
			for (var i in cards) {
				var card = JSON.parse(cards[i]);
				if (card.disabled == '0') {
					_card.push(card);
				}
			}
			req.session.info = data;
			res.locals.mobile = req.session.mobile;
			res.locals.name = req.session.name;
			res.locals.data = data;
			res.locals.cards = _card;
			res.render('login/deposit');
		});
	})

	router.get('/dt',function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/dt'); 
		client.get('/user/1b030cd80e354fe686091a7765c994bd', null, function(er, rq, res_, data) {
			var cards = data.userMoney.cards || {};
			var _card = [];
			for (var i in cards) {
				var card = JSON.parse(cards[i]);
				if (card.disabled == '0') {
					_card.push(card);
				}
			}
			req.session.info = data;
			res.locals.mobile = req.session.mobile;
			res.locals.name = req.session.name;
			res.locals.data = data;
			res.locals.cards = _card;
			res.render('login/deposit');
		});
	})

	router.post('/deposit', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/deposit'); 
		var d = req.body;
		client.post_form('/trade/' + req.session.user + '/deposit', {
			terminal: 3,
			passwd: d.checkcode,
			cardId: d.bankNo,
			amount: d.camount
		}, function(er, rq, rs, data) {
			if(er){
				res.render('process/rs', {
					err: '充值失败',
					cb: '/login/finance'
				});
			}else{
				if (data.code === 0) {
					req.session.info = null;
					res.render('process/rs', {
						time: 3,
						err: '充值成功',
						cb: '/login/finance'
					});
				} else{
					res.render('process/rs', {
						err: data.detail,
						cb: '/login/finance'
					});
				}
			}
			// if (data.code === 0) {
			// 	req.session.info = null;
			// 	res.render('process/rs', {
			// 		time: 3,
			// 		err: '充值成功',
			// 		cb: '/login/finance'
			// 	});
			// }else if(data.code === -1){
			// 	res.render('process/rs', {
			// 		err: '支付密码错误',
			// 		cb: '/login/finance'
			// 	});
			// }else {
			// 	res.render('process/rs', {
			// 		err: '充值失败，请检查银行卡是否余额不足',
			// 		cb: '/login/finance'
			// 	});
			// }
		});
	});

	router.post('/withdraw', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/withdraw');
		var d = req.body;
		client.post_form('/trade/' + req.session.user + '/withdrawApply', {
			terminal: 3,
			passwd: d.zfpassword,
			cardId: d.bankNo,
			amount: d.samount
		}, function(er, rq, rs, data) {
			if (data.code === 0) {
				req.session.info = null;
				res.render('process/rs', {
					time: 3,
					err: '提现申请成功，预计到账时间为明天',
					cb: '/login/finance'
				});
			} else {
				res.render('process/rs', {
					err: data.detail,
					cb: '/login/finance'
				});
			}
		});
		logger.info('handle time>>',new Date().getTime() - bt);
	});

	//金票宝赎回申请
	router.post('/jpb/redeem', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/jpb/redeem');
		var d = req.body;
		
		client.put_form('/product/redeem/' + req.session.user , {
			terminal: 3,
			paypwd: d.zfpassword,
			amount: d.samount
		}, function(er, rq, rs, data) {
			if(er){
				logger.error(" err.",er);
			}
			if(!er){
				if (data.code === 0) {
					req.session.info = null;
					res.render('process/rs', {
						time: 3,
						err: '赎回申请成功',
						cb: '/login/finance'
					});
				} else {
					res.render('process/rs', {
						err: data.detail,
						cb: '/login/finance'
					});
				}
			}else{
				res.render('process/rs',{
					err:'赎回申请失败',
					cb:'/login/finance'
				})
			}
		});
		logger.info('handle time>>',new Date().getTime() - bt);
	});

	router.get('/trade', auth.need_login, function(req, res) {
		res.locals.linkage = req.session.linkage
		res.locals.mobile = req.session.mobile;
		res.locals.name=req.session.name;
		res.render('login/order');
	});

	router.get('/addmore', function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/addmore'); 
		var page = parseInt(req.query.start)/parseInt(req.query.length) +1 ;
		var draw = req.query.draw;

		res.locals.mobile = req.session.mobile;
		res.locals.name=req.session.name;
		client.get('/trade/tradelist', {
			payStyle: '',
			terminal:'',
			mobile: req.session.info.mobile,
			page:  page,
			record: parseInt(req.query.length)
		}, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			var _data ={//返回数据
				aaData: rs.list,
				draw: parseInt(draw),
				iTotalDisplayRecords: rs.count ,
				iTotalRecords: rs.count
			}
			res.send(_data);
			logger.info('handle time>>',new Date().getTime() - bt);
		});
	});

	router.get('/invest', auth.need_login, function(req, res) {
		res.locals.linkage = req.session.linkage
		res.locals.mobile = req.session.mobile;
		res.locals.name=req.session.name;
		res.render('login/invest');
	});

	router.get('/addinvest', function(req, res) {
		var page = parseInt(req.query.start)/parseInt(req.query.length) +1 ;
		var draw = req.query.draw;

		client.get('/invest/' + req.session.user, {
			page: page,
			record: parseInt(req.query.length)
		}, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			var _data ={//返回数据
				aaData: rs.list,
				draw: parseInt(draw),
				iTotalDisplayRecords: rs.count ,
				iTotalRecords: rs.count
			}
			res.send(_data);
		});
	});

	//vip中的积分明细
	router.get('/point_detail', auth.need_login,  function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/point_detail'); 
		var page = parseInt(req.query.start)/parseInt(req.query.length) ;
		var draw = req.query.draw;
		client.get('/point/' + req.session.user +"/point", {
			page: page,
			record: parseInt(req.query.length)
		}, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			var _data ={//返回数据
				aaData: rs.list,
				draw: parseInt(draw),
				iTotalDisplayRecords: rs.count ,
				iTotalRecords: rs.count
			}
			res.send(_data);
		});
			
	});
	

	router.get('/myvip', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/myvip'); 
		if (!req.session.info) {
			res.redirect('/login/finance');
			return;
		}

		async.parallel({
			//有效的体验券
			'tyqticket': function(cb) {
				client.get('/ticket/' + req.session.user+'/tyq', null, function(er, rq, rs, data) {
					res.locals.tyqtickets = data;
					cb();
				});
			},
			//体验券投资记录
			'tyqinvest': function(cb) {
				client.get('/invest/tyq/'+req.session.user, null, function(er, rq, rs, data) {
					if(er){
						logger.error(" err.",er);
					}
					res.locals.tyqinvest = data;
					cb();
				});
			},
			//有效的现金券
			'xjqticket': function(cb) {
				client.get('/ticket/' + req.session.user + '/all/2/0', null, function(er, rq, rs, data) {

					res.locals.xjqtickets = data;
					cb();
				});
			},
			//有效的理财券
			'ticket': function(cb) {
				client.get('/ticket/' + req.session.user + '/lcq/0', null, function(er, rq, rs, data) {
					res.locals.tickets = data;
					//即将到期的理财券，endTime 小于等于3天
					var nowTime = moment().add(3, 'd').format("YYYY-MM-DD");
					var aboutToExpire = [];
					var aboutToExpireAmount = 0;
					var validTicket = [];
					var j=0;
					for(var i = 0; i<data.length; i++){
						if(j<3 && data[i].endDate <= nowTime){
							j++;
							aboutToExpire.push(data[i]);
							aboutToExpireAmount = aboutToExpireAmount + data[i].amount;
						}else{
							validTicket.push(data[i]);
						}
					}
					//即将到期的理财券
					res.locals.aboutToExpireTickets = aboutToExpire;
					res.locals.aboutToExpireAmount = aboutToExpireAmount;
					//有效期中除去即将到期的理财券
					res.locals.validTickets = validTicket;
					cb();
				});
			},
			//已使用的理财券
			'usedTicket': function(cb) {
				client.get('/ticket/' + req.session.user + '/lcq/1', null, function(er, rq, rs, data) {

					var usedTicketAmount = 0;
					for (var i = 0; i < data.length; i++) {
						usedTicketAmount = usedTicketAmount + data[i].amount;
					}
					res.locals.usedtickets = data;
					res.locals.usedticketsAmount = usedTicketAmount;
					cb();
				});
			},
			//已过期的理财券
			'overTicket': function(cb) {
				client.get('/ticket/' + req.session.user + '/lcq/-1', null, function(er, rq, rs, data) {
					var overTicketAmount = 0;
					for (var i = 0; i < data.length; i++) {
						overTicketAmount = overTicketAmount + data[i].amount;
					}
					res.locals.overtickets = data;
					res.locals.overticketsAmount = overTicketAmount;
					cb();
				});
			},
			//赠送他人理财券信息
			'largessTicket': function(cb) {
				client.get('/tpLog/' + req.session.user + '/-20', null, function(er, rq, rs, data) {
					var largess = 0;
					for (var i = 0; i < data.length; i++) {
						largess = largess + data[i].amount;
					}
					res.locals.largesstickets = data;
					res.locals.largessticketsAmount = largess;
					cb();
				});
			}
		}, function(er, result) {
			res.locals.info = req.session.info;
			res.locals.mobile = req.session.mobile;
			res.locals.name=req.session.name;
			res.locals.linkage = req.session.linkage;
			if(req.query.active ){
				res.locals.active=req.query.active;
			}else{
				res.locals.active='lcj';
			}			
			res.render('vip/index');
		});
	});

	router.get('/myvip/up', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/myvip/up'); 
		client.get('/point/' + req.session.user + '/vip', null, function(er, rq, res_, rs) {
			if(er){
				logger.error(" err.",er);
			}
			if (rs.code === 0) {
				req.session.info = null;
				res.render('process/rs', {
					time: 3,
					err: '兑换成功',
					cb: '/login/finance'
				});
			} else {
				res.render('process/rs', {
					err: rs.detail,
					cb: '/login/myvip'
				});
			}
		});
	});

	router.get('/myvip/point2ticket', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/myvip/point2ticket'); 
		var point = req.query.point;
		if (point != '500' && point != '1800' && point != '4000') {
			res.render('process/rs', {
				time: 3,
				err: '兑换失败，不支持其他额度的兑换',
				cb: '/login/myvip'
			});
			return;
		}
		client.post_form('/point/' + req.session.user + '/ticket', {
			amount: point
		}, function(er, rq, res_, rs) {
			if (rs.code === 0) {
				req.session.info = null;
				res.render('process/rs', {
					time: 3,
					err: '兑换成功',
					cb: '/login/finance'
				});
			} else {
				res.render('process/rs', {
					err: rs.detail,
					cb: '/login/myvip'
				});
			}
		});
	});

	//体验券兑换
	router.post('/tyq',auth.need_login,function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/tyq'); 
		client.post_form('/ticket/tyq/'+req.session.user,req.body,function(er,rq,res_,rs){

			if(!er && rs.code==0){
				res.render('process/rs', {
					time: 3,
					err: '兑换成功',
					cb: '/login/myvip'
				});
			}else{
				res.render('process/rs', {
					time: 3,
					err: rs.detail ?rs.detail :'兑换失败',
					cb: '/login/myvip'
				});
			}
		});
	});

	//企业号绑定
	router.get('/enterprise',auth.need_login,function(req,res){
		res.locals.enterprise = req.session.info ? req.session.info.enterprise : ''
		res.render('login/enterprise');
	});

	//企业号解除绑定
	router.get('/cancelEnterprise',auth.need_login,function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/cancelEnterprise'); 
		client.put_form('/user/'+req.session.user+'/enterprise',{
			enterprise:''
		}, function(er, rq, res_, rs){
			if(er){
				logger.error(" err.",er);
			}
			if(rs.code == 0){
				req.session.info.enterprise = rs.value.enterprise;
				res.render('process/rs', {
					time: 3,
					err: "解除绑定成功",
					cb: '/login/setting'
				});
			} else {
				res.render('process/rs', {
					err: rs.detial || '解除绑定失败',
					cb: '/login/setting'
				});
			}
		})
	});

	//企业号绑定
	router.post('/enterprise',auth.need_login,function(req, res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/enterprise'); 

		client.put_form('/user/'+req.session.user+'/enterprise',{
			enterprise:req.body.enterprise
		}, function(er, rq, res_, rs){
			if(er){
				logger.error(" err.",er);
			}
			if(rs.code == 0){
				req.session.info.enterprise = rs.value.enterprise;
				res.render('process/rs', {
					time: 3,
					err: "绑定企业号成功",
					cb: '/login/setting'
				});
			} else {
				res.render('process/rs', {
					err: rs.detial || '绑定企业号失败',
					cb: '/login/setting'
				});
			}
		})
	});

	//申购预约取消
	router.get('/cancelSchedule',auth.need_login,function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/cancelSchedule'); 
		client.del('/schedule/'+req.query.scheduleNo, null, function(er, rq, res_, rs){
			if(er){
				logger.error(" err.",er);
			}
			if(!er &&rs.code == 0){
				res.render('process/rs', {
					time: 3,
					err: "解约成功",
					cb: '/login/finance'
				});
			} else {
				res.render('process/rs', {
					err: rs.detial || '解约失败',
					cb: '/login/finance'
				});
			}
		})
	});

	//申购预约设置
	router.post('/schedule',auth.need_login,function(req, res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/schedule'); 
		client.post_form('/schedule',{
			userId:req.session.user,
			amount:req.body.yyamount,
			payPasswd:req.body.payPasswd
		}, function(er, rq, res_, rs){
			if(er){
				logger.error(" err.",er);
			}
			if(!er &&rs.code == 0){
				res.render('process/rs', {
					time: 3,
					err: "预约成功",
					cb: '/login/finance'
				});
			} else {
				res.render('process/rs', {
					err: rs.detail || '预约失败',
					cb: '/login/finance'
				});
			}
		})
	});

	// router.get('/phone', auth.need_login, auth.user_info, user_info, function(req, res) {
	// 	res.render('login/phone');
	// });

	// router.get('/email', auth.need_login, auth.user_info, user_info, function(req, res) {
	// 	res.render('login/email');
	// });

	router.get('/setting', auth.need_login, function(req, res) {
		var bt = new Date().getTime();   
		logger.info('router in ... /login/setting'); 
		async.parallel({
			'userInfo':function(cb){
				client.get('/user/' + req.session.user, null, function(er, rq, res_, data) {

					var cards = data.userMoney.cards || {};
					var _card = [];
					for (var i in cards) {
						var card = JSON.parse(cards[i]);
						if (card.disabled == '0') {
							_card.push(card);
						}
					}

					req.session.card = _card;
					req.session.info = data;
					res.locals.mobile = req.session.mobile;
					res.locals.data = data;
					res.locals.cards = _card;
					req.session.ic = data.ic;
					req.session.name = data.name;
					res.locals.ic = data.ic;
					res.locals.name = req.session.name;
					res.locals._banks = _cardType;
					res.locals._pay_pwd = data.userMoney.payPasswd == defaultPaypwd;
					req.session._pay_pwd = data.userMoney.payPasswd == defaultPaypwd;
					// res.render('login/setting');
					cb();
				});

			},
			//外连接
			'linkage':function(cb){
				client.get('/doc/4', null, function(er, rq, rs, data) {
					res.locals.linkage = data;
					req.session.linkage = data;
					cb();
				});

			}
		},function(er, v) {
			res.render('login/setting');
		})
	});

	router.get('/area/provinces',auth.need_login, function(req,res){
		logger.info('router in.../login/area/provinces',req.query)
		var cond = {};
		if(req.query.province){
			cond['province'] = req.query.province;
		}
		client.get('/area/provinces',cond,function(er,rq,rs,result){
			res.send(result);
		})
	})

	router.get('/area/citys',auth.need_login, function(req,res){
		logger.info('router in.../login/area/citys',req.query);
		var cond = {};
		if(req.query.fatherId){
			cond['fatherId'] = req.query.fatherId;
		}
		if(req.query.city){
			cond['city'] = req.query.city;
		}
		client.get('/area/citys',cond,function(er,rq,rs,result){
			res.send(result);
		})
	})

	router.get('/commission',auth.need_login, function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/commission'); 

		res.locals.linkage = req.session.linkage   //记录用户登录信息
		res.locals.mobile = req.session.mobile;
		res.locals.name=req.session.name;

		client.get('/commission/one/'+req.session.user,null,function(er,rq,rs,result){			
			if(er){
				logger.error(" err.",er);
			}

			if(er){
				log.error('错误信息',er) 
				res.render('login/commission');
			}else{
				res.locals.commission = result.value;
				res.render('login/commission');
			}
			
		})
	})

//佣金数据查询
	router.get('/commission_page',auth.need_login, function(req,res){
		var bt = new Date().getTime();   
		logger.info('router in ... /login/commission_page');

    	var draw = req.query.draw,
			draw = parseInt(draw);//转为整型防止跨站脚本（XSS）攻击
    	var cond= {
    		start:req.query.start/req.query.length,
    		flag:req.query.flag,//根据字段条件1还是2进行查询
    		length:req.query.length
    	};
    	// var id = "123123123"
    	client.get("/commission/" + req.session.user+ "/list", cond, function(er, rq, rs, result) {
			if(er){
				logger.error(" err.",er);
			}
			var _data ={//返回数据
				draw: draw,
				aaData: result.aaData,
				iTotalDisplayRecords: result.iTotalDisplayRecords,
				iTotalRecords: result.iTotalRecords
			}
			res.send(_data);
		})
	});

	// 佣金提取   这里的路由/commission/redeem是自己定义的路由，不重名即可， 这里的路由/commission/one/是根据后台接口
	 router.post('/commission/redeem', auth.need_login, function(req, res) {  
		var bt = new Date().getTime();   
		logger.info('router in ... /login/commission/redeem');

		var d = req.body;
		client.put_form('/commission/one/' + req.session.user , {           
			// terminal: 1,
			paypwd: d.zfpassword,
			amount: d.amount
		}, function(er, rq, rs, data) {
			if(er){
				logger.error(" err.",er);
			}
			if(!er){
				if (data.code === 0) {
					req.session.info = null;
					res.render('process/rs', {
						time: 3,
						err: '提取佣金成功',
						cb: '/login/commission'
					});
				} else {
					res.render('process/rs', {
						err: data.detail,
						cb: '/login/commission'
					});
				}
			}else{
				res.render('process/rs',{
					err:'佣金提取失败',
					cb:'/login/commission'
				})
			}
		});
 	});

	router.get('/logout', auth.need_login, function(req, res) {
		req.session.destroy();
		res.redirect('/');
	});

};