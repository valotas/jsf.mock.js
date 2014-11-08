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

    describe('handlersSize()', function () {
      it('should return the size of the current handlers', function () {
        expect(jsf.ajax.handlersSize()).toEqual(0);
        jsf.ajax.addOnEvent(noop);
        expect(jsf.ajax.handlersSize()).toEqual(1);
      });

      it('should return the size of the error handlers if called with error as an argument', function () {
        expect(jsf.ajax.handlersSize('error')).toEqual(0);
        jsf.ajax.addOnEvent(noop);
        expect(jsf.ajax.handlersSize('error')).toEqual(0);
        jsf.ajax.addOnError(noop);
        expect(jsf.ajax.handlersSize('error')).toEqual(1);
      });

      it('should return the size of the handlers with the given name when called with an agument other than error', function () {
        expect(jsf.ajax.handlersSize('name1')).toEqual(0);
        jsf.ajax.addOnEvent(noop);
        expect(jsf.ajax.handlersSize('name1')).toEqual(0);
        jsf.ajax.addOnEvent(function name1() {});
        expect(jsf.ajax.handlersSize('name1')).toEqual(1);
        jsf.ajax.addOnError(function name1() {});
        expect(jsf.ajax.handlersSize('name1')).toEqual(2);
      });
    });

  });
});
