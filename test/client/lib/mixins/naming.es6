import assert from 'assert'
import _ from 'lodash'

import NamingMixin from 'client/lib/mixins/naming'


describe('client/lib/mixins/naming module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof NamingMixin, 'object');
  });

  it('apply naming functions', function() {
    let foo = {};
    _.assign(foo, NamingMixin, {
      _name: 'foo',
      _shortName: 'fo',
      _abbreviation: 'f'
    });

    assert.strictEqual(foo.getName(), 'foo');
    assert.strictEqual(foo.getShortName(), 'fo');
    assert.strictEqual(foo.getAbbreviation(), 'f');

    foo._abbreviation = null;
    assert.strictEqual(foo.getAbbreviation(), 'fo');

    foo._shortName = null;
    assert.strictEqual(foo.getShortName(), 'foo');
    assert.strictEqual(foo.getAbbreviation(), 'foo');
  });
});
