import assert from 'assert';

import {sumChances, sumIntegers, sumLists, sumParametersByType, sumPowers, sumRates
  } from 'client/lib/calculation';


describe('client/lib/calculation module', function() {

  it('sumPowers', function() {
    assert.strictEqual(sumPowers([]), 0);
    assert.strictEqual(sumPowers([0.4, 0.5]), 0.9);
    assert(-0.201 < sumPowers([0.1, -0.3]));
    assert(-0.199 > sumPowers([0.1, -0.3]));
  });

  it('sumRates', function() {
    assert.strictEqual(sumRates([]), 1.0);
    assert.strictEqual(sumRates([0.4, 0.5]), 0.2);
    assert.throws(() => {
      sumRates([-0.01]);
    }, /-0.01/);
  });

  it('sumChances', function() {
    assert.strictEqual(sumChances([]), 0.0);
    assert(0.439 < sumChances([0.2, 0.3]));
    assert(0.441 > sumChances([0.2, 0.3]));
    assert.strictEqual(sumChances([1.0, 0.5]), 1.0);
    assert.throws(() => {
      sumChances([1.01]);
    }, /1.01/);
    assert.throws(() => {
      sumChances([-0.01]);
    }, /-0.01/);
  });

  it('sumIntegers', function() {
    assert.strictEqual(sumIntegers([]), 0);
    assert.strictEqual(sumIntegers([1, 2, -1]), 2);
    assert.strictEqual(sumIntegers([1, 2.5]), 3);
  });

  it('sumLists', function() {
    assert.deepEqual(sumLists([]), []);
    assert.deepEqual(sumLists([['a', 'b']]), ['a', 'b']);
  });

  it('sumParametersByType', function() {
    assert.strictEqual(sumParametersByType('chance', [0.5, 0.5]), 0.75);
    assert.strictEqual(sumParametersByType('every', [true, 1]), true);
    assert.strictEqual(sumParametersByType('integer', [1.5, -3]), -2);
    assert.deepEqual(sumParametersByType('list', [[1], [2]]), [1, 2]);
    assert.deepEqual(sumParametersByType('power', [0.5, 2]), 2.5);
    assert.deepEqual(sumParametersByType('rate', [0.5, 2]), 1.0);
    assert.deepEqual(sumParametersByType('some', [false, 0]), false);
  });
});
