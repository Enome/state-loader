/*global $*/

$(function () {

  /* Adds statehashchange events */

  $(window).stateHashChange();

  /* Initiaze state hash push */

  $('*[data-state-push]').stateHashPush();

  /* On hash change */

  var containers = $('*[data-state-container]');

  $(window).on('statehashchange', function (e, obj) {
    containers.each(function () {
      $(this).loadState(obj);
    });
  });

  /* On state change */

  containers.on('statechange', function (e, old_state, new_state, resume) {

    /* preventDefault: lets do animations before removing old state */
    e.preventDefault();

    var reverse = e.hash_object.reverse;

    /* New state */

    var prefix = new_state.attr('data-animate');

    if (prefix) {
      if (reverse) {
        new_state.addClass('cl-animation-reverse'); 
      }

      new_state.animationStyle({ style: prefix + '-enter' });
    }

    /* Old state */

    prefix = old_state.attr('data-animate');

    if (!prefix) {
      return resume(); 
    }

    old_state.removeClass('cl-animation-reverse'); 

    if (reverse) {
      old_state.addClass('cl-animation-reverse'); 
    }

    old_state.animationStyle({ style: prefix + '-leave', callback: resume });

  });

  /* On state unload */

  containers.on('stateunload', function (e, contents, resume) {

    e.preventDefault();

    var prefix = contents.attr('data-animate');

    if (!prefix) {
      return resume(); 
    }

    contents.animationStyle({ style: prefix + '-leave', callback: resume });

  });
  
});
