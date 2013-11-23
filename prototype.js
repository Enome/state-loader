/*global $, jQuery*/

$(function () {

  var querystring = window.querystring();

  /* Get hash object */

  var getHashObject = function () {
    return querystring.parse(window.location.hash.substr(1));
  };

  /* Set hash */

  var setHashObject = function (obj) {
    window.location.hash = querystring.stringify(obj);
  };

  /* State Pusher */

  $('*[data-state-push]').click(function () {
    var t = $(this);
    var qs = eval('(' + t.attr('data-state-push') + ')');
    setHashObject($.extend(getHashObject(), qs));
  });

  /* State Loader */

  var setHtml = function (container, url) {

    $.get(url, function (response) {

      var state = $(response);

      var resume = function () {
        container.html(state);  
      };

      var event = jQuery.Event('stateadded');
      container.trigger(event, [state, resume]);

      if (!event.isDefaultPrevented()) {
        resume();
      }
    });
  
  };

  var loadState = function () {

    var qs = getHashObject();

    for (var prop in qs) {

      if (qs.hasOwnProperty(prop)) {

        var url = qs[prop];
        var container = $('*[data-state-container=' + prop + ']');

        if (url) {
          setHtml(container, url);
        } else if (container.contents().length) {
          var contents = container.contents();

          var resume = function () {
            container.empty();
          };

          var event = $.Event('stateremoved');
          container.trigger(event, [contents, resume]);

          if (!event.isDefaultPrevented()) {
            resume();
          }

        }

      }

    }
    
  };

  var container = $('*[data-state-container]');

  container.on('stateadded', function (e, contents, resume) {
    e.preventDefault();
    resume();
  });

  container.on('stateremoved', function (e, contents, resume) {
    contents.trigger('removedfromcontainer');
    contents.children().trigger('removedfromcontainer');
  });

  $('h1').on('removedfromcontainer', function () {
    console.log('removed'); 
  });

  $('document').delegate('h1', 'removedfromcontainer', function () {
    console.log('removed'); 
  });

  $(window).on('hashchange', function () {
    loadState();
  });

  loadState();

});
