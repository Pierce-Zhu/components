+ function($) {

	"use strict";

	var PicUploader = function(element, options) {
		this.$element = $(element)
		this.options = $.extend({}, options)
		this.$btn_upload = this.$element.find('[data-picuploder-btn-upload]')
		this.$thumbnail = this.$element.find('[data-picuploder-thumbnail]')
		this.$progress = this.$element.find('[data-picuploder-progress]').hide()
		this.$error_info = this.$element.find('span.text-danger').hide()
		this.$input = this.$element.find('[data-picuploder-input]');
		this.$urls = this.$element.find('[data-url]');

		this.wordUrl = [];
		this.$fileSaveUrl = this.$element.find('input.fileUrl');
		this.fileShow = "";
		this.$showName = this.$element.find('span.showName');

		this.init()
		this.listen()
		if (this.$input.val()) {
			this.$thumbnail.attr('src', this.url(true));
		}
		return this
	}

	PicUploader.prototype = {

		constructor: PicUploader

		,
		url: function(style) {
			return "https://dn-" + this.options.qiniuBucket + ".qbox.me/" + this.options.qiniuKey +
				(this.options.qiniuStyle && style ? '/' + this.options.qiniuStyle : '') + '?time=' + new Date().getTime();
		}

		,
		init: function() {
			var $t = this
			var button_id = new Date().getTime().toString()
			this.$btn_upload.attr('id', button_id)

			this._uploader = new plupload.Uploader({
				multipart_params: {
					'key': $t.options.qiniuKey,
					'token': $t.options.qiniuToken
				},
				runtimes: 'html5,flash',
				// url: 'http://up-z2.qiniu.com/',
				url: 'http://up-z2.qiniu.com/',
				flash_swf_url: __uri('../flash/Moxie.swf'),
				filters: {
					max_file_size: '20000000',
					mime_types: [{
						title: "Image files",
						extensions: "jpg,jpeg,png"
					},{
						title:"application/document",
						extensions: "doc,docx,xls,xlsx"
					}]
				},
				browse_button: button_id,
				container: this.$element.attr('id'),
				init: {
					FilesAdded: function(up, files) {
						console.info("files:",files);
						for (var i = 0; i < files.length; i++) {
							var random = Math.floor(Math.random()*10+1);

							var parms = {
								bucket:$t.options.qiniuBucket,
								key:random + "_" + files[i].name
								// key:new Date().getTime().toString()
							}
							// var qiniuUrl = "https://dn-" + $t.options.qiniuBucket + ".qbox.me/"+parms.key;
							var qiniuUrl = "http://oimp78vd3.bkt.clouddn.com/" +parms.key;
							var objs = {
								name:files[i].name,
								url : qiniuUrl
							}
							$t.fileShow += '<button data-id="' + qiniuUrl + '" type="button" class="deleteFiles" style="opacity: 0.5;font-size:14px;">' + files[i].name + 
											'</button>&nbsp;&nbsp;';
							$t.wordUrl.push(objs);
							var tokenUrl = $t.$urls.val();
							$.get(tokenUrl,parms,function(result) {
								// console.info("get success", result.code);
								if(result.code==0){
									up.settings.multipart_params = result.data;
									$t.$btn_upload.hide();
									$t.$progress.show()
									up.start();
								}
							});
						};
						
						
					},
					UploadProgress: function(up, file) {

						$t.$progress.find('.progress-bar')
							.css('width', file.percent + "%").find('span').html(file.percent + "%")
					},
					Error: function(up, err) {
						var error_span = $t.$error_info.show();
						if (err) {
							if (err.code == plupload.FILE_EXTENSION_ERROR)
								error_span.html('文件类型不正确,请上传jpg,jpeg,png类型文件');
							if (err.code == plupload.FILE_SIZE_ERROR)
								error_span.html('文件过大,请上传小于4MB文件');
							if (err.code == plupload.FILE_DUPLICATE_ERROR)
								error_span.html('上传重复文件');
							if (err.code == plupload.FILE_COUNT_ERROR)
								error_span.html('选择文件过多,请每次上传一张图片');
							if (err.code == plupload.IMAGE_FORMAT_ERROR)
								error_span.html('文件格式错误');
							if (err.code == plupload.IMAGE_MEMORY_ERROR)
								error_span.html('运行错误,内存耗尽');
							if (err.code == plupload.INIT_ERROR)
								error_span.html('初始化上传插件错误');
							if (err.code == -200)
								error_span.html('文件上传错误: ' + $.parseJSON(err.response).error);
						}
					},
					FileUploaded: function(up, data, responseHeaders) {

						//隐藏进度条
						$t.$progress.hide().find('.progress-bar')
							.css('width', "0%").find('span').html("0%")
						$t.$btn_upload.show();
						$t.$error_info.html('上传成功!').show().fadeOut(10000);
						// var urls = $t.url(true)
						// $t.$thumbnail.attr('src', urls).show();
						$t.$input.val($t.options.qiniuKey);

						// console.info("objs:", objs);
						// console.info("objs:", $t.wordUrl);
						$t.$fileSaveUrl.val(JSON.stringify($t.wordUrl));
						$t.$showName.append($t.fileShow);
						$t.fileShow = "";
					}
				}
			})
			this._uploader.init()
		}

		,
		listen: function() {
			var $t = this;
			this.$thumbnail.on('click', function(event) {
				$(this).attr('src', $t.url(true));
				window.open($t.url());
				return false;
			});
		}
	}

	var old = $.fn.picuploader

	$.fn.picuploader = function(option) {
		var options = typeof option == 'object' && option
		this.each(function() {
			var $this = $(this),
				data = $this.data('picuploader'),
				options = typeof option == 'object' && option
			if (!data) $this.data('picuploader', (data = new PicUploader(this, options)))
		})
		if (options.instance)
			return $(this).data('picuploader')
		return this
	}

	$.fn.picuploader.defaults = {}

	$.fn.picuploader.Constructor = PicUploader

	$.fn.picuploader.noConflict = function() {
		$.fn.picuploader = old
		return this
	}

	$(window).on('load', function() {
		$('[data-picuploder]').each(function() {
			var $picuploader = $(this)
			$picuploader.picuploader($picuploader.data())
			$('._edit').show();
		})
	})

}(jQuery);