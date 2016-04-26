$(document).ready(function() {
	$('#login_form').on('submit', function(event) {
		if ($('#footer-xs').css('display') == 'block') {
			$(this).find('input[name="_callback"]').val(1);
		}
		return $(this).validator({
			'mobile': ['isMobile', ''],
			'pwd': ['is', '', '^\\S{6,18}$']
		}, true);
	});
});