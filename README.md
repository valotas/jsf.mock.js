# jsf.mock.js

When it comes to TDD, `jsf.js` needs to be mocked somehow.

## Quickstart

Just include `jsf.mock.js` and you are good to go.

Mocked methods:

- `jsf.ajax.addOnEvent` adds the given function to a local array
- `jsf.ajax.addOnError` adds the given function to a local array

Helper methods:

- `jsf.ajax.fire([type], eventData, [name])` fires an event with the given data. If no `type` is provided, only the non error handlers will be used. If `type === 'error'` only the error handlers will be used. Finally if a `name` is provided handlers will be filtered based on their name.

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

## References
- The [jsf.js api][jsf-js-doc]

[jsf-js-doc]: https://javaserverfaces.java.net/docs/2.0/jsdocs/symbols/jsf.ajax.html
