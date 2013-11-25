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

    e.preventDefault();

    var prefix = new_state.attr('data-animate');

    if (prefix) {
      new_state
        .animationStyle({ style: prefix + '-leave' })
        .animationStyle({ style: prefix + '-active' });
    }

    prefix = old_state.attr('data-animate');

    if (!prefix) {
      return resume(); 
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

    contents.animationStyle({ style: prefix + '-enter', callback: resume });
  });
  
});
