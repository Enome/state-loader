/*global jQuery*/

;(function ($, window, document, querystring, undefined) {

  var plugin_name = 'loadState';

  /* Plugin */

  var getState = function (url, callback) {
    
    $.get(url, function (response) {
      callback($(response));
    });

  };

  var plugin = function (element, options) {

    var id = element.attr('data-state-container');

    if (options.id === id) {

      if (element.data('current_state') === options.url) {
        return; 
      }

      element.data('current_state', options.url);

      getState(options.url, function (state) {

        var old = element.contents();

        var resume = function () {
          if (old.length) {
            element[0].removeChild(old[0]);
          }
        };

        element.append(state);

        var event = $.Event('statechange');

        element.trigger(event, [old, state, resume]);

        if (!event.isDefaultPrevented()) {
          resume(); 
        }
        
      });

    }

  };

  /* Initialize plugin */

  $.fn[plugin_name] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, plugin($(this), options));
      }
    });
  };

})(jQuery, window, document, window.querystring());


;(function ($, window, document, querystring, undefined) {

  var plugin_name = 'unloadState';

  /* Plugin */

  var plugin = function (element, options) {

    var id = element.attr('data-state-container');
    var contents = element.contents();

    var resume = function () {
      element.empty();
    };

    if (options.id === id && contents.length !== 0) {
      element.data('current_state', '');

      var event = $.Event('stateunload');
      element.trigger(event, [contents, resume]);
      if (!event.isDefaultPrevented()) {
        resume(); 
      }
    }

  };

  /* Initialize plugin */

  $.fn[plugin_name] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, plugin($(this), options));
      }
    });
  };

})(jQuery, window, document, window.querystring());
