/*!
 * viewMore v0.1.0
 */
;(function($) {
	var instance = 1;
	var viewMore = function($container, options, idx) {
		var vmId = 'viewMore'+idx;
		var dh = $container.height();//.offset().top;
		var lh = parseFloat($container.css('line-height').replace('px', ''));
		var lines = dh / lh;

		if (lines > options.maxLines) {
			var visHeight = (lh * options.maxLines);
			var origHeight = $container.height();
			$container.css('height', visHeight).css('overflow','hidden').css('margin-bottom',lh);
			var top = $container.offset().top + dh + lh;

			$('body').append('<span id="'+vmId+'" class="viewMore" style="background-color: '+options.bgColor+'; cursor: pointer;" data-state="closed">'+options.moreText+'</span>');
			var vmWidth = $('#'+vmId).width();
			var vmHeight = $('#'+vmId).height();
			var $viewMore = $('#'+vmId).detach()

			var right = $container.offset().left + $container.width() - vmWidth;

			$container.css('position', 'relative');
			
			var top = visHeight - vmHeight;
			$viewMore.css('position','absolute').css('top',top+'px').css('right','0');
			$viewMore.click(function(e){
				if ($(this).data('state') == 'closed') {
					$container.css('height','auto');
					$(this)
						.data('state', 'open')
						.css('top', 'auto')
						.css('position', '')
						.css('float', 'right')
						.html(options.lessText);
				} else {
					$container.height(visHeight);
					$(this)
						.data('state', 'closed')
						.css('top', top)
						.css('float', 'auto')
						.css('position', 'absolute')
						.html(options.moreText);
				}
			});
			$container.append($viewMore)
		}
	}


	// plugin
	$.fn.viewMore = function(options) {
		var defaults = {
			moreText	: 'View More',
			lessText	: 'View Less',
			maxLines	: 2,
			bgColor		: '#FFF'
		};
		
		var options =  $.extend(true, defaults, options);
		
		return this.each(function() {
			instance++;
			if ($(this).data('viewMoreInit') === true) {
				var viewMoreInst = $(this).data('viewMore');
			} else {
				$(this).data('viewMoreInit', true);
				var viewMoreInst = new viewMore($(this), options, instance);
				$(this).data('viewMore', viewMoreInst);
			}

			return viewMoreInst;
		});
	};
})(jQuery);
