/*jshint browser:true*/
/*global describe, it, expect, jsf, jasmine*/

describe('jsf.mock.js', function () {
  'use strict';
  
  function noop () {}
  
  describe('jsf.ajax', function () {
    it('should provide a fireEvent function', function () {
      expect(jsf.ajax.fireEvent).toBeDefined();
    });
    
    it('should provide addOnEvent to add a listener', function () {
      jsf.ajax.addOnEvent(noop);
      expect(jsf.ajax.handlers().length).toEqual(1);
    });

    it('should fire handles when fireEvent is called', function () {
      var handler = jasmine.createSpy('handler'),
        eventData = {};
      
      jsf.ajax.addOnEvent(handler);
      jsf.ajax.fireEvent(eventData);
      expect(handler).toHaveBeenCalledWith(eventData);
    });
    
    it('should fire an events only on functions with the given name if provided', function (){
      var handlerSpy = jasmine.createSpy('handler'),
        eventData = {};
      
      jsf.ajax.addOnEvent(handlerSpy);
      jsf.ajax.addOnEvent(function handle (event) {
        handlerSpy(event);
      });
      
      jsf.ajax.fireEvent(eventData, 'handle');
      expect(handlerSpy.calls.count()).toEqual(1);
    });
  });
});
