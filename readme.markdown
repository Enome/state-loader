# State Loader

Combination of jQuery plugins to load html files (states) inside a container element.

## Bower

```sh
bower install state-loader
```

You can find the the separate plugins in `build/plugins` and the concatinated version at `build/state-loader.js`.

## state-hash-change.js

```js
$(window).stateHashChange();
```

This plugin adds the `statehashchange` event to the window object. The event passes the event object and hash object to the handler.

```js
$(window).on('statehashchange', function (e, obj) { });
```

## state-push.js

```js
$('*[data-state-push]').stateHashPush();
```

Clicking an element with `data-state-push='{ page: "file.html"}'` will add `#page=file.html` to the url hash. The hash is merged and not replaced.

## state-container.js

```html
<div class='container' data-state-container='page'></data>
```

```js
var obj = {
  page: 'file.html'
};

$('.container').loadState(obj);
```

This will load the contents of file.html inside the div container. Containers get the event `statechange` and `stateunload`.

**statechange event:**

```js

var one = {
  page: 'file1.html'
};

var two = {
  page: 'file2.html'
};

$('.container').loadState(one);
$('.container').loadState(two);

$('.container').on('statechange', function (event, old_state, new_state, resume) {

  // By default the new state gets appended to the container 
  // and the old state gets removed.

  // old_state = 'file1.html'
  // new_state = 'file2.html'

  e.preventDefault(); // Stops the plugin from removing the old state.

  /* Do stuff with the new and old state. */

  resume(); // Continue with the default action (remove old state).

});
```

**stateunload event:**

```js

var one = {
  page: 'file1.html'
};

var two = {
  page: '' // Empty string will unload a state
};

$('.container').loadState(one);
$('.container').loadState(two);

$('.container').on('stateunload', function (event, old_state, resume) {

  // By default the old state gets removed

  e.preventDefault(); // Stops the plugin from removing the old state.

  /* Do stuff with the old state. */

  resume(); // Continue with the default action (remove old state).

});
```

## state-animation.js

```js
$('selector').animationStyle({ style: 'some-css-class', callback: function () {} });
```

This will add a `some-css-class` css class to the element and play the css animation. When the animation is finished the class gets removed.

You can also chain animation styles if needed.

```js
$('selector')
  .animationStyle({ style: 'some-css-class' })
  .animationStyle({ style: 'some-other-css-class' });
```

## Build

```shell
npm install
grunt
```

## Run the example

```sh
npm install http-server -g
http-server -p 3000
```

Then visit http://0.0.0.0:3000/example.
