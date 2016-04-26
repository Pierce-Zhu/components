$(document).ready(function() {

	$('#register_form').on('submit', function(event) {
		if ($('#footer-xs').css('display') == 'block') {
			$(this).find('input[name="_callback"]').val(1);
		}
		return $(this).validator({
			'mobile': ['isMobile', ''],
			'checkcode': ['is', '', '^\\d{6}$'],
			'pwd': ['is', '', '^\\S{6,18}$'],
			'pwd_d': ['value_eq', '', 'pwd_r'],
			'referee': ['is', '', '(^$|^\\d{11}$|^\\d{6}$)']
		}, true);
	});

	var _time = 0,
		_cc_t_id;

	var $mobile_r = $('#mobile_r'),
		$checkcode = $('#get_checkcode');

	function _cc_time() {
		$checkcode.html(_time + '秒后可重新获取');
		_time--;
		if (_time == 0) {
			clearInterval(_cc_t_id);
			$checkcode.html('获取验证码');
		}
	};

	$('#cc_img').on('click', function(e) {
		$(this).attr('src', '/common/cc?type=mobile&rc=' + Math.floor(Math.random() * 10000));
		$('#cc_image').focus();
	});

	$checkcode.on('click', function(event) {
		if (_time > 0) {
			return false;
		}
		if (!$mobile_r.validator({
				'mobile': ['isMobile', ''],
				'cc_image': ['is', '', '^\\S{4}$']
			}, true)) {
			return false;
		}
		$.getJSON('/account/cc', {
			mobile: $mobile_r.val(),
			cc_image: $('#cc_image').val()
		}, function(data, textStatus, xhr) {
			if (data.no !== 0) {
				alert('图片验证码错误');
				$('#cc_img').trigger('click');
				_time = 2;
			} else {
				_time = 60;
			}
			_cc_time();
			_cc_t_id = setInterval(_cc_time, 1000);
		});
	});
});