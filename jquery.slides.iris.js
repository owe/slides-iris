/**
 * slides | jQuery plugin
 * Copyright (C) 2010 - 2011 Oktober Media DA
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 * @author Erling Owe <owe@oktobermedia.no>
 * @copyright Oktober Media DA, 2010 - 2011
 */


(function($) {
	
	var defaultOptions = {
		speed: 200
	};
	
	var opts;
	
	$.slides.registerTransition({
		
		name: 'iris',
		
		transition: function(o, callback) {

			var currentSlide = o.slides.eq(o.index);
			var newSlide = o.slides.eq(o.transitionTo);

			o.slides.css('z-index', '0');
	    	currentSlide.css('z-index', '1');
			
	
	
			// GPU accelerate if possible.
			if ($.browser.webkit && Modernizr.csstransitions) {

				newSlide.css('-webkit-mask', "url('" + opts.resourcesURI + "iris.png')");
				newSlide.css('-webkit-mask-repeat', 'no-repeat');
				newSlide.css('-webkit-mask-position', '50% 50%');
				newSlide.css('-webkit-mask-size', '0px');
				newSlide.css('z-index', '2');
				newSlide.show();

				o.slides.css('-webkit-transition', '-webkit-mask-size ' + (opts.speed / 1000) + 's ease-in');
				
				// TODO: Find a better way to ensure that the new slide is completely visible than setting the mask size to: Math.ceil(o.outerContainer.width() * 1.5)
				newSlide.css('-webkit-mask-size', Math.ceil(o.outerContainer.width() * 1.5) + 'px');
			
				// Clean up and call callback.
				newSlide.one('webkitTransitionEnd', function() {
					o.slides.css('-webkit-transition', 'initial');
					currentSlide.hide();
					callback();
				});
			
			} else {
	
		 		newSlide.hide().css('z-index', '2');
				newSlide.fadeIn(opts.speed, function() {
					currentSlide.hide();
					callback();
				});
				
			}

		},
		
		init: function(o) {
			
			opts = jQuery.extend({}, defaultOptions, o.options);
			
			opts.resourcesURI = o.resourcesURI;
			
			o.slides.not(o.slides.eq(o.index)).hide();
			
		}

	});
	
})(jQuery);