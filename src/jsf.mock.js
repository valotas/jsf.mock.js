/*jshint browser:true*/

(function (g) {
  'use strict';

  var jsf = {},
    ajax = {},
    onevents = [];
  
  function IllegalArgumentException(message) {
    this.name = 'IllegalArgumentException';
    this.message = message;
  }
  
  function getFunctionName (f) {
    var matches = /function\s+(\w+).*/.exec(f.toString());
    if (matches && matches.length === 2) {   
      return matches[1]; 
    }
    return null;
  }
  
  jsf.ajax = ajax;
  
  ajax.addOnEvent = function (f) {
    var type = typeof f; 
    if (type !== 'function') {
      throw new IllegalArgumentException('Can not add a non function as an event listener. Given: ' + type);
    }

    onevents.push({
      name: getFunctionName(f),
      handler: f
    });
  };
  
  ajax.fireEvent = function (data, name) {
    onevents
      .filter(function (h) {
        if (name) {
          return name === h.name;  
        }
        return true;
      })
      .forEach(function (h) {
        h.handler(data);
      });
  };
  
  ajax.handlers = function () {
    return onevents;
  };
  
  //Export our module
  g.jsf = jsf;
})(window);