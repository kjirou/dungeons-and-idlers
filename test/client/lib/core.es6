import assert from 'assert';

import {dictionarize, listize, rotateIndex, within} from 'client/lib/core';


describe('client/lib/core module', function() {

  it('within', function() {
    assert.strictEqual(within(0.0, 0.0, 1.0), 0.0);
    assert.strictEqual(within(1.0, 0.0, 1.0), 1.0);
    assert.strictEqual(within(-0.01, 0.0, 1.0), 0.0);
    assert.strictEqual(within(1.01, 0.0, 1.0), 1.0);
  });

  it('dictionarize', function() {
    assert.deepEqual(
      dictionarize([
        { type: 'foo', value: 1 },
        { type: 'bar', value: 2 }
      ], 'type'),
      {
        foo: { type: 'foo', value: 1 },
        bar: { type: 'bar', value: 2 }
      }
    );
  });

  it('listize', function() {
    assert.deepEqual(
      listize({
        foo: { value: 1 },
        bar: { value: 2 }
      }, 'type'),
      [
        { type: 'foo', value: 1 },
        { type: 'bar', value: 2 }
      ]
    );
  });

  it('rotateIndex', function() {
    assert.strictEqual(rotateIndex(10, 0, 1), 1);
    assert.strictEqual(rotateIndex(10, 3, 5), 8);
    assert.strictEqual(rotateIndex(10, 5, 7), 2);
    assert.strictEqual(rotateIndex(10, 0, -1), 9);
    assert.strictEqual(rotateIndex(0, 0, 1), -1);
  });
});
