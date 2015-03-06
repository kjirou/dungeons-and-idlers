import assert from 'assert'

import {createComponentClassName, createPageComponentClassName} from 'client/lib/view';


describe('client/lib/view module', () => {

  it('createComponentClassName', () => {
    assert.strictEqual(createComponentClassName(), 'component');
    assert.strictEqual(createComponentClassName('foo'), 'component foo-component');
    assert.strictEqual(createComponentClassName('foo', 'bar'), 'component foo-component bar-foo-component');
  });

  it('createPageComponentClassName', () => {
    assert.strictEqual(createPageComponentClassName(), 'component page-component');
    assert.strictEqual(createPageComponentClassName('foo'), 'component page-component foo-page-component');
  });
});
