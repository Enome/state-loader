/*global jQuery*/

;(function ($, window, document, undefined) {

  var plugin_name = 'loadState';

  var getState = function (url, callback) {
    
    $.get(url, function (response) {
      callback($(response));
    });

  };

  var plugin = function (element, options) {

    var id = element.attr('data-state-container');
    var url = options[id];
    var contents = element.contents();

    /* Load */

    if (url) {

      if (element.data('current_state') === url) {
        return; 
      }

      element.data('current_state', url);

      getState(url, function (state) {

        var resume = function () {
          if (contents.length) {
            element[0].removeChild(contents[0]);
          }
        };

        element.append(state);

        var event = $.Event('statechange');
        event.hash_object = options;

        element.trigger(event, [contents, state, resume]);

        if (!event.isDefaultPrevented()) {
          resume(); 
        }

        state.find('*[data-state-push]').stateHashPush();
        
      });

      return;

    }

    /* unload */

    if (contents.length !== 0) {
    
      var resume = function () {
        element.empty();
      };

      element.data('current_state', '');

      var event = $.Event('stateunload');
      event.state = url;

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

})(jQuery, window, document);
