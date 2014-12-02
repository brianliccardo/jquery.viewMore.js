/*!
 * viewMore v0.2.1
 */
;(function($) {
	var instance = 1;
	var viewMore = function($container, options, idx) {
		var vmId = 'viewMore'+idx;
		var wrapperId = 'viewMoreWrap'+idx;
		var dh = $container.height();
		var lh = parseFloat($container.css('line-height').replace('px', ''));
		var lines = dh / lh;

		if (lines > options.maxLines) {
			var visHeight = (lh * options.maxLines);
			var origHeight = $container.height();
			$container.css('height', visHeight).css('overflow','hidden');
			
			// wrap container in div
			$container.wrap('<div id="'+wrapperId+'"></div>');
			var $wrapper = $('#'+wrapperId);
			
			// add toggler to wrapper
			$wrapper.append('<span id="'+vmId+'" class="viewMoreToggle" style="cursor: pointer;" data-state="closed">'+options.moreText+'</span>');
			
			$viewMore = $('#'+vmId);
			
			var top = visHeight;
			$viewMore.click(function(e){
				if ($(this).data('state') == 'closed') {
					
					var curHeight = $container.height();
					$container.css('height', 'auto');
					var autoHeight = $container.height();
					$container.height(curHeight)
					
					$container.animate({height:autoHeight},200);
					
					$(this)
						.data('state', 'open')
						.html(options.lessText);
				} else {
					$container.animate({height:visHeight},200);
					$(this)
						.data('state', 'closed')
						.html(options.moreText);
				}
			});
		}
	}


	// plugin
	$.fn.viewMore = function(options) {
		var defaults = {
			moreText	: 'View More',
			lessText	: 'View Less',
			maxLines	: 2
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