import assert from 'assert';

import CardifyMixin from 'client/lib/mixins/cardify';


describe('client/lib/mixins/cardify module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof CardifyMixin, 'object');
  });
});
