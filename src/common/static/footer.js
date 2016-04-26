$(document).ready(function() {
	$('#wechat_tooltip').popover({
		container: 'body',
		placement: 'top',
		html: true,
		title: '扫我！扫我！使劲扫我！',
		trigger: 'hover',
		content: '<img class="img-responsive" src="' + __uri('./image/qrcode.jpg') + '"/>'
	});
	$('#wechat_right_tooltip').popover({
		container: 'body',
		placement: 'left',
		html: true,
		trigger: 'hover',
		content: '<img class="img-responsive" src="' + __uri('./image/qrcode.jpg') + '" style="width:150px; height:150px;"/>'
	});

	$('[data-toggle="popover"]').popover();
});