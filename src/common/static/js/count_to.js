	$.fn.countTo = function(options) {
		options = options || {};

		return $(this).each(function() {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from: $(this).data('from'),
				to: $(this).data('to'),
				speed: $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals: $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};


	// start all the timers
	$('.test-a').each(count);

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}

	+ function($) {
		'use strict';

		var CountTo = function(element, options) {
			this.$element = $(element)
			this.options = $.extend({}, CountTo.DEFAULTS, options)
			this.loading = false
		}

		function formatter(value, settings) {
			return value.toFixed(settings.decimals);
		}

		CountTo.DEFAULTS = {
			from: 0, // the number the element should start at
			to: 0, // the number the element should end at
			speed: 1000, // how long it should take to count between the target numbers
			refreshInterval: 100, // how often the element should be updated
			decimals: 2, // the number of decimal places to show
			formatter: formatter, // handler for formatting the value before rendering
			onUpdate: null, // callback method for every time the element is updated
			onComplete: null // callback method for when the element finishes updating
		}

		CountTo.prototype.start = function() {
			if (this.loading) return false;
			var settings = this.options;
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = this.$element,
				loopCount = 0,
				value = settings.from;

			// if an existing interval can be found, clear it first
			if (this.interval) {
				clearInterval(this.interval);
			}
			this.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					clearInterval($self.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		}

		var old = $.fn.CountTo

		$.fn.countTo.Constructor = CountTo


		// BUTTON NO CONFLICT
		// ==================

		$.fn.countTo.noConflict = function() {
			$.fn.countTo = old
			return this
		}

		$(document).ready(function() {
			$(window).scroll(function() {
				var $all = $('[data-toggle="CountTo"]');
				$all.each(function(index, el) {
						
				});
				var a = document.getElementById("eq").offsetTop;
				if (a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
					alert("div在可视范围");
				}
			});
		});

		// BUTTON DATA-API
		// ===============

		$(document)
			.on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
				var $btn = $(e.target)
				if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
				Plugin.call($btn, 'toggle')
				if (!$(e.target).is('input[type="radio"]')) e.preventDefault()
			})
			.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
				$(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
			})

	}(jQuery);