import assert from 'assert';
import _ from 'lodash';

import Route from 'client/lib/stages/route';


describe('client/lib/stages/route module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Route, 'object');
  });

  it('_iconIds, getIconId', function() {
    assert.strictEqual(Route._iconIds, null);
    assert.deepEqual(Route.getIconIds(), {
      default: 'invalid',
      vertical: 'invalid',
      horizontal: 'invalid',
      obstacle: 'invalid'
    });

    var SubRoute = _.assign({}, Route, {
      typeId: 'sub',
      _iconIds: {
        default: 'def',
        vertical: 'vert'
      }
    });
    assert.deepEqual(SubRoute.getIconIds(), {
      default: 'def',
      vertical: 'vert',
      horizontal: 'invalid',
      obstacle: 'invalid'
    });
  });
});
