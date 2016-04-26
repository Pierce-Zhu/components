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

	router.get('/logout', auth.need_login, function(req, res) {
		req.session.destroy();
		res.redirect('/');
	});

};