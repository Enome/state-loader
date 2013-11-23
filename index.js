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

  containers.on('stateloaded', function (e, contents, resume) {
    e.preventDefault();
    contents.fadeIn('slow');
    resume();  
  });

  containers.on('stateunloaded', function (e, contents, resume) {
    e.preventDefault();
    contents.fadeOut('slow', function () {
      resume();  
    });
  });
  
});

/*

$(window).on('hashobjectchange', function (e, obj) {

  console.log('obj');

  return; 

  var container = $('container').stateContainer();

  $('container').unloadState();

  $('container').on('loadstate', function (e, state, resume) {

    e.preventDefault();

    state.find('[data-animate]')
      .enterAnimation()
      .activeAnimation(resume);
    
  });

  $('container').on('unloadstate', function (e, state, resume) {
    state.find('[data-animate]').leaveAnimation(resume);
  });
  
});
*/
