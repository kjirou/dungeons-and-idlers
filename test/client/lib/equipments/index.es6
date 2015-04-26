import assert from 'assert';
import _ from 'lodash';

import {equipmentList, equipments} from 'client/lib/equipments';


describe('client/lib/equipments module', function() {

  it('equipmentList', function() {
    assert(Array.isArray(equipmentList));
    assert(equipmentList.length > 0);
  });

  it('equipments', function() {
    assert.strictEqual(typeof equipments, 'object');
    assert(_.size(equipments) > 0);
    assert('undefined' in equipments === false);
  });

  it('equipment.torch.toCardComponentProps', function() {
    assert.strictEqual(equipments.torch.toCardComponentProps().cardBodyProps.iconClassName, 'torch-icon-image');
  });
});
