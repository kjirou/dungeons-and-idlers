import assert from 'assert';
import sinon from 'sinon';

import MonsterStore from 'client/stores/creatures/monsters/monster';


describe('client/stores/creatures/monsters/monster module', function() {

  context('class definition', function() {

    it('class props', function() {
      assert('MIN_MAX_HP' in MonsterStore);
      assert(MonsterStore.MIN_MAX_HP, 1);
    });

    it('constructor', function() {
      let c = new MonsterStore();
      assert(c instanceof MonsterStore);
    });
  });

  context('sub monster definition', function() {

    it('should be', function() {
      let SubMonsterStore = MonsterStore.extend({}, {
        typeId: 'sub',
        physicalAttackPower: 2
      });

      assert.strictEqual(SubMonsterStore.typeId, 'sub');

      let sub;
      sub = new SubMonsterStore();
      assert.strictEqual(sub.name, 'Sub');
      assert.strictEqual(sub.physicalAttackPower, 2);

      sub = new SubMonsterStore({ name: 'Taro' });
      assert.strictEqual(sub.name, 'Taro');
    });
  });
});
