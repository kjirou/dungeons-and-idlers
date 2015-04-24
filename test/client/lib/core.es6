import assert from 'assert';

import {createCounter, dictionarize, listize, rotateIndex, slideIndex, within} from 'client/lib/core';


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

  it('slideIndex', function() {
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 0), [11, 22, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 1), [22, 11, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 2), [22, 33, 11, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 3), [22, 33, 44, 11]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 4), [11, 22, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, 5), [22, 11, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, -1), [22, 33, 44, 11]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, -2), [22, 33, 11, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, -3), [22, 11, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, -4), [11, 22, 33, 44]);
    assert.deepEqual(slideIndex([11, 22, 33, 44], 0, -5), [22, 33, 44, 11]);

    // isDestructive option
    let src, dest;
    src = [1];
    dest = slideIndex(src, 0, 1);
    assert.notStrictEqual(src, dest);
    src = [1];
    dest = slideIndex(src, 0, 1, true);
    assert.strictEqual(src, dest);

    // error
    assert.throws(() => {
      slideIndex([], 0, 0);
    });
  });

  it('createCounter', function() {
    let counter;
    counter = createCounter();
    assert.strictEqual(counter(), 1);
    assert.strictEqual(counter(), 2);
    counter = createCounter(-2);
    assert.strictEqual(counter(), -2);
    assert.strictEqual(counter(), -1);
  });
});
