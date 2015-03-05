import assert from 'assert'

import { createClassName } from 'client/lib/view';


describe('client/lib/view module', () => {

  it('createClassName', () => {
    assert.strictEqual(createClassName(), 'view');
    assert.strictEqual(createClassName('foo'), 'view foo-view');
    assert.strictEqual(createClassName('foo', 'bar'), 'view foo-view bar-foo-view');
  });
});
