import assert from 'assert';

import App from 'client/app';
import Storage from 'client/lib/storage';


describe('client/lib/storage module', function() {

  it('constructor', function() {
    let s = new Storage();
    assert(s instanceof Storage);
  });

  it('_getNamespace', function() {
    let s = new Storage();
    if (App.isNode()) {
      assert.strictEqual(s._getNamespace(), 'test:');
    } else {
      assert.strictEqual(s._getNamespace(), 'client:');
    }
  });

  it('basic usage', function() {
    let s = new Storage();
    s.save('foo', { x: 1, y: 2});
    assert.deepEqual(s.fetch('foo'), { x: 1, y: 2 });

    s.save('bar', 1);
    assert.strictEqual(s.fetch('bar'), 1);

    assert.deepEqual(s.fetch('undefined_key'), null);

    s.remove('foo');
    assert.deepEqual(s.fetch('foo'), null);
  });

  it('clear', function() {
    let s = new Storage();
    s.save('foo', 1);
    s.save('bar', 2);
    s._getNamespace = function() {
      return 'hoge:';
    };
    s.save('x', true);

    let ls = s._getLocalStorage();
    assert.strictEqual(ls.length, 3);

    s.clear();
    assert.strictEqual(ls.length, 2);
  });
});
