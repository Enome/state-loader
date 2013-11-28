/*global jQuery*/

;(function ($, window, document, querystring, undefined) {

  var plugin_name = 'stateHashChange';

  /* Get hash object */

  var getHashObject = function () {
    return querystring.parse(window.location.hash.substr(1));
  };

  /* Plugin */

  var plugin = function (element) {

    setTimeout(function () {
      element.trigger('statehashchange', getHashObject());
    }, 0);

    element.on('hashchange', function () {
      element.trigger('statehashchange', getHashObject());
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

})(jQuery, window, document, window.querystring());
