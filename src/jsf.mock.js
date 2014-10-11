/*jshint browser:true*/

(function (g) {
  'use strict';
  
  function IllegalArgumentException(message) {
    this.name = 'IllegalArgumentException';
    this.message = message;
  }
  
  function EventBus () {
    var handlers = [];
    
    function getFunctionName (f) {
      var matches = /function\s+(\w+).*/.exec(f.toString());
      if (matches && matches.length === 2) {   
        return matches[1]; 
      }
      return null;
    }
    
    this.add = function (type, handler) {
      var handlerType = typeof handler; 
      if (handlerType !== 'function') {
        throw new IllegalArgumentException('Can not add a non function as an event handler. Given type: ' + handlerType);
      }

      handlers.push({
        type: type,
        name: getFunctionName(handler),
        handler: handler
      });
    };
    
    this.fire = function(type, data, name) {
      if (type !== 'error' || type !== 'normal') {
        name = data;
        data = type;
        type = 'normal';
      }
      handlers
        .filter(function (h) {
          if (type !== h.type) {
            return false; 
          }
          if (name) {
            return h.name === name; 
          }
          return true;
        })
        .forEach(function (h) {
          h.handler(data);
        });
    };
    
    this.handlersSize = function (type) {
      var t = type || 'normal';
      return handlers.filter(function (h) {
        return h.type === t;
      }).length;
    };
  }

  var jsf = {},
    ajax = new EventBus();
  
  jsf.ajax = ajax;
  
  ajax.addOnEvent = function (f) {
    this.add('normal', f);
  };
  
  ajax.addOnError = function (f) {
    this.add('error', f);
  };
  
  //Export our module
  g.jsfmock = jsf;
  g.jsf = jsf;
})(window);
