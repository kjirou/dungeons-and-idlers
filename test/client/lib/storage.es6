import assert from 'assert';

import conf from 'client/conf';
import Storage from 'client/lib/storage';


describe('client/lib/storage module', function() {

  beforeEach(function() {
    Storage._getLocalStorage().clear();
  });

  it('constructor', function() {
    let s = new Storage();
    assert(s instanceof Storage);
  });

  it('_getNamespace', function() {
    let s = new Storage();
    if (conf.isNode) {
      assert.strictEqual(s._getNamespace(), 'test:');
    } else {
      assert.strictEqual(s._getNamespace(), 'client:');
    }
  });

  it('basic usage', function() {
    let s = new Storage();
    return Promise.resolve()
      // object
      .then(() => { return s.save('foo', { x: 1, y: 2}) })
      .then(() => { return s.fetch('foo'); })
      .then((data) => { assert.deepEqual(data, { x: 1, y: 2 }); })
      // array
      .then(() => { return s.save('bar', ['a', 'b']); })
      .then(() => { return s.fetch('bar'); })
      .then((data) => { assert.deepEqual(data, ['a', 'b']); })
      // scala value
      .then(() => { return s.save('baz', 1); })
      .then(() => { return s.fetch('baz'); })
      .then((data) => { assert.strictEqual(data, 1); })
      // undefined key
      .then(() => { return s.fetch('undefined_key'); })
      .then((data) => { assert.strictEqual(data, null); })
      // removing
      .then(() => { return s.remove('foo'); })
      .then(() => { return s.fetch('foo'); })
      .then((data) => { assert.strictEqual(data, null); })
    ;
  });

  it('clear', function() {
    let s = new Storage();
    let ls = Storage._getLocalStorage();

    return Promise.resolve()
      .then(() => { return s.save('foo', 1); })
      .then(() => { return s.save('bar', 2); })
      .then(() => {
        s._getNamespace = function() {
          return 'hoge:';
        };
      })
      .then(() => { return s.save('x', true); })
      .then(() => {
        assert.strictEqual(ls.length, 3);
        return s.clear();
      })
      .then(() => { assert.strictEqual(ls.length, 2); })
    ;
  });
});
