'use strict';
var auth = require('../lib/auth');
var captcha = require('util-captcha');

module.exports = function(router) {
	router.get('/', function(req, res) {
		res.redirect('/index');

	});

	router.get('/common/cc', captcha.mid_pic_session());
};