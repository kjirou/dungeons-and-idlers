import assert from 'assert';
import _ from 'lodash';

import Equipment from 'client/lib/equipments/equipment';


describe('client/lib/equipments/equipment module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Equipment, 'object');
  });


  context('sub equipment definition', function() {

    it('should be', function() {
      let SubEquipment = _.assign({}, Equipment, {
        typeId: 'sub',
        _summary: 'it is sub equipment'
      });
      assert.strictEqual(SubEquipment.getSummary(), 'it is sub equipment');
      assert.strictEqual(SubEquipment.toCardComponentProps().cardBodyProps.iconClassName, 'invalid-icon-image');
    });
  });
});
