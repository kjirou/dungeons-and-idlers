import assert from 'assert';

import {within} from 'client/lib/core';


describe('client/lib/core module', function() {

  it('within', function() {
    assert.strictEqual(within(0.0, 0.0, 1.0), 0.0);
    assert.strictEqual(within(1.0, 0.0, 1.0), 1.0);
    assert.strictEqual(within(-0.01, 0.0, 1.0), 0.0);
    assert.strictEqual(within(1.01, 0.0, 1.0), 1.0);
  });
});
