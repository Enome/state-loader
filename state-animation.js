/*global jQuery*/

;(function ($, window, document, undefined) {

  var plugin_name = 'animationStyle';

  var plugin = function (element, options) {

    var style = options.style;

    element.queue(function (next) {

      var end = function () {
        next();
        options.callback && options.callback();
      };

      setTimeout(function () {

        element.addClass(style);
        element.removeClass(element.data('previous_animation_style'));
        element.data('previous_animation_style', style);

        var duration = element.css('transition-duration');

        if (duration === '0s') {
          return end();
        }

        element.on('transitionend', end);
        
      }, 0);
      
    });

  };

  /* Initialize plugin */

  $.fn[plugin_name] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, plugin($(this), options));
      }
    });
  };

})(jQuery, window, document);
