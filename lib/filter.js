var moment = require('moment');
var uid2 = require('uid2');

function circle(d1, d2) {
	var cc = parseInt(moment(d2).diff(moment(d1), 'days'));
	return cc;
}

function qiniu(key, bucket, style) {
	return "https://dn-" + bucket + ".qbox.me/" + key + (style ? '/' + style : '');
}

function timeNum(){
	return moment().format('YYYYMMDDHHmmssSSS');
}

function currency(num, dot) { //格式化货币 000,000,000方式显示
	if (dot === 0) {
		num = Number(num).toFixed(0);
	} else {
		dot = dot || 2;
		num=''+num;
		if(num.indexOf(".")>0 && num.length>num.indexOf(".")+dot){
			num=num.substring(0,num.indexOf(".")+dot+1);
		}else{
			num = Number(num).toFixed(dot);
		}
	}
	var n = '' + num;
	var r = n.replace(/(^|-|\s)\d+(?=\.?\d*($|\s))/g, function(m) {
		return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
	});
	if (dot === 0) {
		return r;
	} else {
		var i = r.indexOf('.');
		if (i >= 0) return r.substring(0, i + 1 + dot);
		else {
			r += '.';
			for (var i = dot; i > 0; dot--) {
				r += '0';
			};
			return r;
		}
	}
}

module.exports = {
	"qiniu": qiniu,
	"circle": circle,
	"currency":currency,
	"timeNum":timeNum
};