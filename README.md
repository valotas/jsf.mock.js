# jsf.mock.js [![Build Status](https://travis-ci.org/valotas/jsf.mock.js.svg?branch=master)](https://travis-ci.org/valotas/jsf.mock.js)

When it comes to TDD, `jsf.js` needs to be mocked somehow.

## Quickstart

Just include `jsf.mock.js` and you are good to go.

Mocked methods:

- `jsf.ajax.addOnEvent` adds the given function as a normal event handler to a local array
- `jsf.ajax.addOnError` adds the given function as an error handler to the local array

Helper methods:

- `jsf.ajax.fire([type], eventData, [name])` fires an event with the given data. If no `type` is provided, only the non error handlers will be used. If `type === 'error'` only the error handlers will be used. Finally if a `name` is provided handlers will be filtered based on their name.
- `jsf.ajax.hadlersSize([type])` returns the size of the available handlers of the given `name`
- `jsf.ajax.clearHandlers()` clears all the existing handlers available

Here is an exaple of how to use it

```js
var errorHandler = function () {};

jsf.ajax.addOnEvent(function () {});
jsf.ajax.addOnError(errorHandler);
jsf.ajax.addOnError(function anotherErrorHandler() {});

jsf.ajax.fire({}); //only the anonymous handler will be used
jsf.ajax.fire('error', {}); //only the error handlers will be used
jsf.ajax.fire('error', {}, 'anotherErrorHandler'); // only the anotherErrorHandler will be used
```

## Developing

Assuming that you have node installed, you can `gulp tdd` in order to watch for file changes and run the tests. Before you commit make sure you run the default `gulp` task.

Finally you can use gulp to to a release with `gulp release [--major|minor]`. If no major or minor will be given the version will get bumped as a patch.

## References
- The [jsf.js api][jsf-js-doc]

[jsf-js-doc]: https://javaserverfaces.java.net/docs/2.0/jsdocs/symbols/jsf.ajax.html
