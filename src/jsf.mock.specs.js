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
  });
});
  