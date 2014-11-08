/*jshint browser:true*/
/*global describe, it, expect, beforeEach, jasmine, jsfmock*/

describe('jsf.mock.js', function () {
  'use strict';
  
  function noop () {}
  
  var jsf;

  beforeEach(function () {
    jsf = jsfmock();
  });

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

    describe('clearHandlers()', function () {

      it('should clear all existing handlers when no argument is given',function () {
        jsf.ajax.addOnEvent(noop);
        expect(jsf.ajax.handlersSize()).toBe(1);
        jsf.ajax.clearHandlers();
        expect(jsf.ajax.handlersSize()).toBe(0);
      });

      it('should clear all error handlers when error is given as argument',function () {
        jsf.ajax.addOnError(noop);
        jsf.ajax.addOnEvent(noop);
        expect(jsf.ajax.handlersSize()).toBe(1);
        expect(jsf.ajax.handlersSize('error')).toBe(1);
        jsf.ajax.clearHandlers('error');
        expect(jsf.ajax.handlersSize()).toBe(1);
        expect(jsf.ajax.handlersSize('error')).toBe(0);
      });

      it('should clear named handlers with the given name as argument',function () {
        jsf.ajax.addOnError(function h1 () {});
        jsf.ajax.addOnEvent(function h1 () {});
        jsf.ajax.addOnEvent(function h1 () {});
        expect(jsf.ajax.handlersSize()).toBe(2);
        expect(jsf.ajax.handlersSize('error')).toBe(1);
        jsf.ajax.clearHandlers('h1');
        expect(jsf.ajax.handlersSize()).toBe(0);
        expect(jsf.ajax.handlersSize('error')).toBe(0);
      });
    });

  });
});
