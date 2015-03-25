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

  context('hp accessors', function() {

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
});


//    it 'hp accessors', ->
//      u = new UnitStore
//      sinon.stub u, '_getMaxHp', -> 100
//
//      u._updateHp 100
//      assert.strictEqual u.hp, 100
//      assert.strictEqual u.hpRate, 1.0
//      assert.strictEqual u.wound, 0
//      assert.strictEqual u.woundRate, 0.0
//      assert u.isFullHp()
//
//      u._updateHp 75
//      assert.strictEqual u.hp, 75
//      assert.strictEqual u.hpRate, 0.75
//      assert.strictEqual u.wound, 25
//      assert.strictEqual u.woundRate, 0.25
//      assert not u.isFullHp()
//
//    it 'healed, healedByRate, healedFully', ->
//      u = new UnitStore
//      sinon.stub u, '_getMaxHp', -> 100
//
//      u._updateHp 1
//      assert.strictEqual u.hp, 1
//      delta = u.healed 2
//      assert.strictEqual u.hp, 3
//      assert.strictEqual delta, 2
//
//      delta = u.healedByRate 0.1
//      assert.strictEqual u.hp, 13
//      assert.strictEqual delta, 10
//
//      delta = u.healedFully()
//      assert.strictEqual u.hp, 100
//      assert.strictEqual delta, 100
//
//      u.healed 1
//      assert.strictEqual u.hp, 100
//
//    it 'damaged, damagedByRate, damagedFully', ->
//      u = new UnitStore
//      sinon.stub u, '_getMaxHp', -> 100
//
//      u.healedFully()
//      assert.strictEqual u.hp, 100
//      delta = u.damaged 2
//      assert.strictEqual u.hp, 98
//      assert.strictEqual delta, 2
//
//      delta = u.damagedByRate 0.1
//      assert.strictEqual u.hp, 88
//      assert.strictEqual delta, 10
//
//      delta = u.damagedFully()
//      assert.strictEqual u.hp, 0
//      assert.strictEqual delta, 100
//
//      u.healed 2
//      delta = u.damaged 1000, shouldSurvive: true
//      assert.strictEqual u.hp, 1
//      assert.strictEqual delta, 1000
//
//      u.healed 2
//      delta = u.damagedByRate 0.5, shouldSurvive: true
//      assert.strictEqual u.hp, 1
//      assert.strictEqual delta, 50
//
//    it 'isDead, isAlive, isActable', ->
//      u = new UnitStore
//      sinon.stub u, '_getMaxHp', -> 100
//
//      u.healedFully()
//      assert u.isAlive()
//      assert u.isActable()
//      u.damagedFully()
//      assert u.isDead()
//      assert not u.isActable()
//
//    it 'adaptStates', ->
//      u = new UnitStore
//      sinon.stub u, '_getMaxHp', -> 100
//      u.set 'hp', 200
//      assert.strictEqual u.hp, 200
//      u.adaptStates()
//      assert.strictEqual u.hp, 100
//
//    it 'executeFixedlyStates', ->
//      u = new UnitStore
//      stub = sinon.stub u, '_getMaxHp', -> 100
//      u._updateHp 75
//      assert.strictEqual u.hp, 75
//      u.executeFixedlyStates ->
//        stub.restore()
//        sinon.stub u, '_getMaxHp', -> 200
//      assert.strictEqual u.hp, 150
