import assert from 'assert';
import _ from 'lodash';

import IconizeMixin from 'client/lib/mixins/iconize';


describe('client/lib/mixins/iconize module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof IconizeMixin, 'object');
  });

  it('getIconId', function() {
    let foo = _.assign({}, IconizeMixin);
    // default
    assert.strictEqual(foo.getIconId(), 'invalid');
    // guess
    foo.typeId = 'fighter';
    assert.strictEqual(foo.getIconId(), 'fighter');
    // explicit
    foo._iconId = 'mage';
    assert.strictEqual(foo.getIconId(), 'mage');
  });

  it('getIconClassName', function() {
    let foo = _.assign({}, IconizeMixin);
    assert(/^invalid-/.test(foo.getIconClassName()));
  });
});
