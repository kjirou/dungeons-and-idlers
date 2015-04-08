import assert from 'assert';

import conf from 'client/conf';


describe('client/conf module', function() {

  it('isNode', function() {
    if (typeof window === 'object') {
      assert(!conf.isNode);
    } else {
      assert(conf.isNode);
    }
  });

  it('env', function() {
    if (conf.isNode) {
      assert.strictEqual(conf.env, 'test');
    } else {
      assert.strictEqual(conf.env, 'client');
    }
  });
});
