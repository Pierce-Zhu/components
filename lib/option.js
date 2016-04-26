'use strict';

// var log = require('./log');
// var mongo = require('./mongo');
var qiniu = require('./qiniu');
var rest = require('util-restify');
var rest = require('util-restify');
var sms = require('util-sms');
var log4js = require('log4js');

var ejs = require('ejs');
var filter = require('util-format');

var filter_ = require('./filter');

for (var k in filter) {
	ejs.filters[k] = filter[k];
}
for (var k in filter_) {
	ejs.filters[k] = filter_[k];
}

module.exports = function spec() {

	return {
		onconfig: function(config, next) {
			// log.config(config.get('tracerConfig'));
			sms.init('xxxxxxxxx', {
				'zc': 'xxxxxxxxx',
				'reset_pay_pwd': 'xxxxxxxxx',
				'zf': 'xxxxxxxxx'
			});
			// mongo.config(config.get('mongoConfig'));
			qiniu.init(config.get('qiniuConfig'));
			rest.init(config.get('restify'));
			log4js.configure(config.get('log4jsConfig'), {});
			next(null, config);
		}
	};

};