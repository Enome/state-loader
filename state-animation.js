/*global jQuery*/

;(function ($, window, document, querystring, undefined) {

  var initialize = function (plugin_name, plugin) {

    $.fn[plugin_name] = function (options) {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + plugin_name)) {
          $.data(this, 'plugin_' + plugin_name, plugin($(this), options));
        }
      });
    };
  
  };

  /* enterStyle */

  var enter = function (element) {
    var prefix = element.attr('data-animate');

    element.queue(function (next) {

      setTimeout(function () {

        element
          .addClass(prefix)
          .addClass(prefix + '-enter');

        next();

        
      }, 0);
      
    });
  };

  /* activeStyle */

  var active = function (element, callback) {
    var prefix = element.attr('data-animate');
    var duration = element.css('transition-duration');

    element.queue(function (next) {

      var end = function () {
        next();
        callback && callback();
      };

      element
        .removeClass(prefix + '-enter')
        .addClass(prefix + '-active');

      if (duration === '0s') {
        return end();
      }

      element.on('transitionend', end);

    });
  };

  /* leaveStyle */

  var leave = function (element, callback) {
    var prefix = element.attr('data-animate');
    var duration = element.css('transition-duration');

    element.queue(function (next) {

      var end = function () {
        next();
        callback && callback();
      };

      element
        .addClass(prefix + '-leave');

      if (duration === '0s') {
        return end();
      }

      element.on('transitionend', end);

    });
  };

  /* Initialize plugins */

  initialize('enterStyle', enter);
  initialize('activeStyle', active);
  initialize('leaveStyle', leave);

})(jQuery, window, document, window.querystring());
