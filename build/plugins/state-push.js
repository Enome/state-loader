/*global jQuery*/

;(function ($, window, document, querystring, undefined) {

  var plugin_name = 'stateHashPush';

  /* Get hash object */

  var getHashObject = function () {
    return querystring.parse(window.location.hash.substr(1));
  };


  /* Set hash */

  var setHashObject = function (obj) {
    window.location.hash = querystring.stringify(obj);
  };


  /* Plugin */

  var plugin = function (element) {

    element.click(function () {
      var qs = eval('(' + element.attr('data-state-push') + ')');
      var hash_object = getHashObject();

      if (!qs.reverse) {
        delete hash_object.reverse;
      }

      for (var prop in hash_object) {

        if (hash_object.hasOwnProperty(prop)) {

          var c = hash_object[prop];

          if (!c) {
            delete hash_object[prop];
          }
        
        }
      }

      setHashObject($.extend(hash_object, qs));
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
