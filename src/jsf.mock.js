/*jshint browser:true*/

(function (g) {
  'use strict';

  var NORMAL = 'normal';

  function IllegalArgumentException(message) {
    this.name = 'IllegalArgumentException';
    this.message = message;
  }

  function EventBus() {
    var handlers = [];

    function getFunctionName(f) {
      var matches = /function\s+(\w+).*/.exec(f.toString());
      if (matches && matches.length === 2) {
        return matches[1];
      }
      return null;
    }

    function createQuery(query) {
      var q = {};
      if (query) {
        q.type = query === 'error' ? 'error' : null;
        q.name = query !== 'error' ? query : null;
      } else {
        q.type = NORMAL;
      }
      return q;
    }
    
    function queryFilter(query) {
      var q = createQuery(query),
        type = q.type,
        name = q.name;

      return function (h) {
        if (type && h.type !== type) {
          return false;
        }
        return !(name) || name === h.name;
      };
    }

    function not(f) {
      return function (h) {
        return !f(h);
      };
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

    this.fire = function (type, data, name) {
      if (type !== 'error' || type !== 'normal') {
        name = data;
        data = type;
        type = NORMAL;
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

    this.handlersSize = function (query) {
      return handlers.filter(queryFilter(query)).length;
    };

    this.clearHandlers = function (query) {
      handlers = handlers.filter(not(queryFilter(query)));
    };
  }

  function jsf() {
    var jsfmock = {};
    jsfmock.ajax = new EventBus();

    jsfmock.ajax.addOnEvent = function (f) {
      this.add('normal', f);
    };

    jsfmock.ajax.addOnError = function (f) {
      this.add('error', f);
    };

    if (!(g.jsf)) {
      g.jsf = jsf;
    }

    return jsf;
  }

  //Export our module
  g.jsfmock = jsf;
})(window);
