import assert from 'assert';
import {Dispatcher} from 'flux'

import CoreDispatcher from 'client/dispatcher/core';


describe('client/dispatcher/core module', function() {

  beforeEach(function() {
    CoreDispatcher.clearInstance();
  });

  it('module definition', function() {
    assert.strictEqual(typeof CoreDispatcher, 'function');
  });

  it('singleton', function() {
    let dispatcher = CoreDispatcher.getInstance();
    let dispatcher2 = CoreDispatcher.getInstance();
    assert.strictEqual(dispatcher, dispatcher2);
  });

  it('should be inherited', function() {
    assert(CoreDispatcher.prototype instanceof Dispatcher);
    let d = CoreDispatcher.getInstance();
    assert('dispatch' in d);
    assert('handleViewAction' in d);
  });
});
