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

    it('getAttacks, attacks, attackUpdates', function() {
      let attacks;

      // default
      let FooStore = MonsterStore.extend();
      let foo = new FooStore();
      attacks = foo.getAttacks();
      assert.strictEqual(attacks.length, 3);
      assert.strictEqual(attacks[0].typeId, 'physical_attack');

      // overwrite by attacks
      let BarStore = MonsterStore.extend({}, {
        attacks: [
          { typeId: 'a' },
          { typeId: 'b' },
          { typeId: 'c' }
        ]
      });
      let bar = new BarStore();
      attacks = bar.getAttacks();
      assert.strictEqual(attacks.length, 3);
      assert.strictEqual(attacks[0].typeId, 'a');
      assert.strictEqual(attacks[1].typeId, 'b');
      assert.strictEqual(attacks[2].typeId, 'c');

      // update by attackUpdates
      let BazStore = MonsterStore.extend({}, {
        attackUpdates: {
          1: { typeId: 'x' },
          3: { typeId: 'z' }
        }
      });
      let baz = new BazStore();
      attacks = baz.getAttacks();
      assert.strictEqual(attacks.length, 3);
      assert.strictEqual(attacks[0].typeId, 'x');
      assert.strictEqual(attacks[1].typeId, 'physical_attack');
      assert.strictEqual(attacks[2].typeId, 'z');
    });
  });
});
