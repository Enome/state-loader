/*global jQuery*/

;(function ($, window, document, undefined) {

  var plugin_name = 'animationStyle';

  var plugin = function (element, options) {

    var style = options.style;

    element.queue(function (next) {

      var end = function () {
        element.removeClass(style);
        next();
        options.callback && options.callback();
      };

      element.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function () {
        end();
      });

      element.addClass(style);

      if (element.css('animation-name') === 'none') {
        end();
      }

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
