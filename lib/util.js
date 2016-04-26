'use strict';

exports.mask = function(text, start, length) {
	if (text) {
		var m = '';
		for (var i = 0; i < length; i++) {
			m += '*';
		}
		return text.substr(0, start) + m + text.substr(start + length);
	}
	return null;
};