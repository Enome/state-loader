/*global jQuery*/

/* loadState */

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

      getState(options.url, function (state) {

        var resume = function () {
          element.unloadState(options);

          setTimeout(function () {
            element.append(state);
          }, 500);
        };

        var event = $.Event('stateloaded');

        element.trigger(event, [state, resume]);

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


/* unloadState */

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
      var event = $.Event('stateunloaded');
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
