'use strict';
var logger = require('tracer');

var Log = function() {
	return {
		config: function(conf) {
			this._log = logger[conf.type](conf.arguments);
		},
		getLogger: function() {
			return this._log;
		}
	};
};

module.exports = Log();