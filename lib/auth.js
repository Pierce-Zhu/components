'use strict';

var util = require('./util');

exports.need_login = function(req, res, next) {

	if (!req.session.mobile) {
		res.redirect('/account/login');
		return false;
	}
	next();
};

exports.user_info = function(req, res, next) {
	res.locals._name = (req.session.ic && req.session.ic.name) || util.mask(req.session.mobile, 3, 4);
	res.locals.mobile = util.mask(req.session.mobile, 3, 4);
	next();
};