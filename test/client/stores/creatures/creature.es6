import assert from 'assert';
import isInteger from 'is-integer';
import sinon from 'sinon';

import CreatureStore from 'client/stores/creatures/creature';


describe('client/stores/creatures/creature module', function() {

  context('class definition', function() {

    it('class props', function() {
      assert('MIN_MAX_HP' in CreatureStore);
      assert(CreatureStore.MIN_MAX_HP, 1);
    });

    it('constructor', function() {
      let c = new CreatureStore();
      assert(c instanceof CreatureStore);
    });
  });

  context('maxHp', function() {

    it('should be', function() {
      let c = new CreatureStore();
      assert(isInteger(c.maxHp));
      assert(c.maxHp > 0);
    });

    it('within max and min', function() {
      let c;
      c = new CreatureStore();
      sinon.stub(c, '_getBaseMaxHp', () => { return CreatureStore.MIN_MAX_HP - 1 });
      assert.strictEqual(c.maxHp, CreatureStore.MIN_MAX_HP);
      c = new CreatureStore();
      sinon.stub(c, '_getBaseMaxHp', () => { return CreatureStore.MAX_MAX_HP + 1 });
      assert.strictEqual(c.maxHp, CreatureStore.MAX_MAX_HP);
    });
  });

  context('hp getters', function() {

    it('hp', function() {
      let c = new CreatureStore({ hp: 3 });
      assert.strictEqual(c.hp, 3);
    });

    it('wound', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      assert.strictEqual(c.wound, 7);
      c.set('hp', 11);
      assert.strictEqual(c.wound, 0);
    });

    it('hpRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      assert.strictEqual(c.hpRate, 0.3);
      c.set('hp', 11);
      assert.strictEqual(c.hpRate, 1);
    });

    it('woundRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      assert.strictEqual(c.woundRate, 0.7);
      c.set('hp', 11);
      assert.strictEqual(c.woundRate, 0);
    });

    it('isFullHp', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      assert.strictEqual(c.isFullHp(), false);
      c.set('hp', 10);
      assert.strictEqual(c.isFullHp(), true);
      c.set('hp', 11);
      assert.strictEqual(c.isFullHp(), true);
    });
  });

  context('hp setters', function() {

    it('beHealed', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beHealed(4);
      assert.strictEqual(c.hp, 7);
      c.beHealed(99);
      assert.strictEqual(c.hp, 10);
      c.beHealed(-1);
      assert.strictEqual(c.hp, 10);
    });

    it('beHealedByRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beHealedByRate(0.4);
      assert.strictEqual(c.hp, 7);
      c.beHealedByRate(0.0001);
      assert.strictEqual(c.hp, 8);
    });

    it('beHealedFully', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beHealedFully();
      assert.strictEqual(c.hp, 10);
    });

    it('beDamaged', function() {
      let c = new CreatureStore({ hp: 7 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beDamaged(4);
      assert.strictEqual(c.hp, 3);
      c.beDamaged(99, { shouldSurvive: true });
      assert.strictEqual(c.hp, 1);
      c.beDamaged(99);
      assert.strictEqual(c.hp, 0);
      c.beDamaged(-1);
      assert.strictEqual(c.hp, 0);
    });

    it('beDamagedByRate', function() {
      let c = new CreatureStore({ hp: 7 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beDamagedByRate(0.4);
      assert.strictEqual(c.hp, 3);
    });

    it('beDamagedFully', function() {
      let c = new CreatureStore({ hp: 7 });
      sinon.stub(c, '_getMaxHp', () => { return 10; });
      c.beDamagedFully();
      assert.strictEqual(c.hp, 0);
    });
  });
});
