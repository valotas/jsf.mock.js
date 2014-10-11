/*jshint browser:true*/
/*global describe, it, expect, jsf, jasmine*/

describe('jsf.mock.js', function () {
  'use strict';
  
  function noop () {}
  
  describe('jsf.ajax', function () {
    it('should provide a fire function', function () {
      expect(jsf.ajax.fire).toBeDefined();
    });
    
    it('should provide addOnEvent to add a listener', function () {
      jsf.ajax.addOnEvent(noop);
      expect(jsf.ajax.handlersSize()).toEqual(1);
    });

    it('should fire handles when fire is called', function () {
      var handler = jasmine.createSpy('handler'),
        eventData = {};
      
      jsf.ajax.addOnEvent(handler);
      jsf.ajax.fire(eventData);
      expect(handler).toHaveBeenCalledWith(eventData);
    });
    
    it('should fire an events only on functions with the given name if provided', function (){
      var handlerSpy = jasmine.createSpy('handler'),
        eventData = {};
      
      jsf.ajax.addOnEvent(handlerSpy);
      jsf.ajax.addOnEvent(function handle (event) {
        handlerSpy(event);
      });
      
      jsf.ajax.fire(eventData, 'handle');
      expect(handlerSpy.calls.count()).toEqual(1);
    });

    it('should provide a function to clear all existing handlers',function () {
      expect(jsf.ajax.handlersSize()).toBeGreaterThan(0);
      jsf.ajax.clearHandlers();
      expect(jsf.ajax.handlersSize()).toBe(0);
    });
  });
});
