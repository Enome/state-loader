/*global $*/

$(function () {

  /* Adds statehashchange events */

  $(window).stateHashChange();

  /* Initiaze state hash push */

  $('*[data-state-push').stateHashPush();

  /* On hash change */

  var containers = $('*[data-state-container]');

  $(window).on('statehashchange', function (e, obj) {

    containers.each(function () {

      var container = $(this);

      $.each(obj, function (key, value) {
        if (value) {
          container.loadState({ id: key, url: value });
        } else {
          container.unloadState({ id: key, url: value });
        }
      });

    });

  });

  /* On state change */

  containers.on('statechange', function (e, old_state, new_state, resume) {

    e.preventDefault();

    new_state
      .enterStyle()
      .activeStyle();

    old_state.leaveStyle(resume);

  });

  /* On state unload */

  containers.on('stateunload', function (e, contents, resume) {
    e.preventDefault();
    contents.leaveStyle(resume);
  });
  
});
