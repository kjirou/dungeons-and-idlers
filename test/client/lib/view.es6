import assert from 'assert'

import { createClassName, createPageClassName } from 'client/lib/view';


describe('client/lib/view module', () => {

  it('createClassName', () => {
    assert.strictEqual(createClassName(), 'view');
    assert.strictEqual(createClassName('foo'), 'view foo-view');
    assert.strictEqual(createClassName('foo', 'bar'), 'view foo-view bar-foo-view');
  });

  it('createPageClassName', () => {
    assert.strictEqual(createPageClassName(), 'view page-view');
    assert.strictEqual(createPageClassName('foo'), 'view page-view foo-page-view');
  });
});
