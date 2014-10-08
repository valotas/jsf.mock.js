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
  
  jsf.ajax = ajax;
  
  ajax.addOnEvent = function (f) {
    if (!(f)) {
      throw new IllegalArgumentException('Can not add undefined as an event listener');
    }
    
    onevents.push(f);
  };
  
  ajax.fireEvent = function (data) {
    onevents.forEach(function (f) {
      f(data);
    });
  };
  
  ajax.handlers = function () {
    return onevents;
  };
  
  //Export our module
  g.jsf = jsf;
})(window);