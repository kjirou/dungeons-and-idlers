import assert from 'assert';
import isInteger from 'is-integer';
import sinon from 'sinon';

import {DartEquipment, LanternEquipment, ShootingEquipment, TorchEquipment} from 'client/lib/equipments';
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

    it('should be within max and min', function() {
      let c;
      c = new CreatureStore();
      c._maxHp = CreatureStore.MIN_MAX_HP - 1;
      assert.strictEqual(c.maxHp, CreatureStore.MIN_MAX_HP);
      c = new CreatureStore();
      c._maxHp = CreatureStore.MAX_MAX_HP + 1;
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
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      assert.strictEqual(c.wound, 7);
      c.set('hp', 11);
      assert.strictEqual(c.wound, 0);
    });

    it('hpRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      assert.strictEqual(c.hpRate, 0.3);
      c.set('hp', 11);
      assert.strictEqual(c.hpRate, 1);
    });

    it('woundRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      assert.strictEqual(c.woundRate, 0.7);
      c.set('hp', 11);
      assert.strictEqual(c.woundRate, 0);
    });

    it('isFullHp', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
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
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      c.beHealed(4);
      assert.strictEqual(c.hp, 7);
      c.beHealed(99);
      assert.strictEqual(c.hp, 10);
      c.beHealed(-1);
      assert.strictEqual(c.hp, 10);
    });

    it('beHealedByRate', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      c.beHealedByRate(0.4);
      assert.strictEqual(c.hp, 7);
      c.beHealedByRate(0.0001);
      assert.strictEqual(c.hp, 8);
    });

    it('beHealedFully', function() {
      let c = new CreatureStore({ hp: 3 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      c.beHealedFully();
      assert.strictEqual(c.hp, 10);
    });

    it('beDamaged', function() {
      let c = new CreatureStore({ hp: 7 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
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
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      c.beDamagedByRate(0.4);
      assert.strictEqual(c.hp, 3);
    });

    it('beDamagedFully', function() {
      let c = new CreatureStore({ hp: 7 });
      sinon.stub(c, 'getMaxHp', () => { return 10; });
      c.beDamagedFully();
      assert.strictEqual(c.hp, 0);
    });
  });


  context('equipments', function() {

    it('_getAggregatedEquipmentsWithTargetedEquipment', function() {
      let s = new CreatureStore();
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: []
      });

      let result;
      result = s._getAggregatedEquipmentsWithTargetedEquipment('torch');
      assert.strictEqual(result[0], s._aggregatedEquipments.deck);
      assert.strictEqual(result[1], TorchEquipment);

      result = s._getAggregatedEquipmentsWithTargetedEquipment('shooting');
      assert.strictEqual(result[0], s._aggregatedEquipments.sub_action);
      assert.strictEqual(result[1], ShootingEquipment);

      assert.throws(() => {
        s._getAggregatedEquipmentsWithTargetedEquipment('not_exists');
      }, /not_exists/);
    });

    it('_expandEquipments', function() {
      let s = new CreatureStore();
      s._aggregatedEquipments.sub_action.push({
        equipment: ShootingEquipment,
        count: 1
      });
      s._aggregatedEquipments.deck.push({
        equipment: TorchEquipment,
        count: 2
      });
      s._aggregatedEquipments.deck.push({
        equipment: LanternEquipment,
        count: 1
      });

      assert.deepEqual(s._equipments, []);
      s._expandEquipments();
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        TorchEquipment,
        TorchEquipment,
        LanternEquipment
      ]);
    });

    it('addOrIncreaseEquipment, decreaseOrRemoveEquipment', function() {
      let s = new CreatureStore();
      s.addOrIncreaseEquipment('torch');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 1 }
        ]
      });
      assert.deepEqual(s._equipments, [
        TorchEquipment
      ]);

      s.addOrIncreaseEquipment('torch');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 2 }
        ]
      });

      s.addOrIncreaseEquipment('shooting');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [
          { equipment: ShootingEquipment, count: 1 }
        ],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 2 }
        ]
      });

      s.addOrIncreaseEquipment('lantern');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [
          { equipment: ShootingEquipment, count: 1 }
        ],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 2 },
          { equipment: LanternEquipment, count: 1 }
        ]
      });

      s.decreaseOrRemoveEquipment('torch');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [
          { equipment: ShootingEquipment, count: 1 }
        ],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 1 },
          { equipment: LanternEquipment, count: 1 }
        ]
      });
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        TorchEquipment,
        LanternEquipment
      ]);

      s.decreaseOrRemoveEquipment('torch');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [
          { equipment: ShootingEquipment, count: 1 }
        ],
        feat: [],
        deck: [
          { equipment: LanternEquipment, count: 1 }
        ]
      });

      s.decreaseOrRemoveEquipment('shooting');
      assert.deepEqual(s._aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: [
          { equipment: LanternEquipment, count: 1 }
        ]
      });
    });

    it('addOrIncreaseEquipment, decreaseOrRemoveEquipment errors', function() {
      let s = new CreatureStore();
      assert.throws(() => {
        s.addOrIncreaseEquipment('not_exists');
      }, /not_exists/);
      assert.throws(() => {
        s.decreaseOrRemoveEquipment('not_exists');
      }, /not_exists/);

      s.addOrIncreaseEquipment('shooting');
      assert.throws(() => {
        s.addOrIncreaseEquipment('sniping');
      }, /sub_action only one/);
    });

    it('slideEquipment', function() {
      let s = new CreatureStore();
      s.addOrIncreaseEquipment('shooting');
      s.addOrIncreaseEquipment('dart');
      s.addOrIncreaseEquipment('lantern');
      s.addOrIncreaseEquipment('torch');
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        DartEquipment,
        LanternEquipment,
        TorchEquipment
      ]);

      s.slideEquipment('lantern', -1);
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        LanternEquipment,
        DartEquipment,
        TorchEquipment
      ]);

      s.slideEquipment('lantern', -1);
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        DartEquipment,
        TorchEquipment,
        LanternEquipment
      ]);

      s.slideEquipment('torch', 1);
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        DartEquipment,
        LanternEquipment,
        TorchEquipment
      ]);

      s.slideEquipment('torch', 1);
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        TorchEquipment,
        DartEquipment,
        LanternEquipment
      ]);

      s.addOrIncreaseEquipment('torch');
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        TorchEquipment,
        TorchEquipment,
        DartEquipment,
        LanternEquipment
      ]);

      s.slideEquipment('torch', 1);
      assert.deepEqual(s._equipments, [
        ShootingEquipment,
        DartEquipment,
        TorchEquipment,
        TorchEquipment,
        LanternEquipment
      ]);

      s.slideEquipment('katana', 1);  // 0個のfeatカテゴリへ実行してもエラーにならない
    });
  });


  context('store and restore', function() {

    it('can not execute store/restore', function() {
      let s = new CreatureStore();
      assert.throws(() => {
        s.store();
      }, /store/);
      assert.throws(() => {
        s.restore();
      }, /restore/);
    });

    it('syncStatesToAttributes', function() {
      let s = new CreatureStore();
      assert.deepEqual(s.get('equipmentPatterns'), [
        { sub_action: [], feat: [], deck: [] },
        { sub_action: [], feat: [], deck: [] },
        { sub_action: [], feat: [], deck: [] }
      ]);

      s.addOrIncreaseEquipment('torch');
      s.syncStatesToAttributes();
      assert.deepEqual(s.get('equipmentPatterns')[0], {
        sub_action: [],
        feat: [],
        deck: [{ equipmentTypeId: 'torch', count: 1 }]
      });

      s.addOrIncreaseEquipment('shooting');
      s.syncStatesToAttributes();
      assert.deepEqual(s.get('equipmentPatterns')[0], {
        sub_action: [{ equipmentTypeId: 'shooting', count: 1 }],
        feat: [],
        deck: [{ equipmentTypeId: 'torch', count: 1 }]
      });

      s.addOrIncreaseEquipment('torch');
      s.syncStatesToAttributes();
      assert.deepEqual(s.get('equipmentPatterns')[0], {
        sub_action: [{ equipmentTypeId: 'shooting', count: 1 }],
        feat: [],
        deck: [{ equipmentTypeId: 'torch', count: 2 }]
      });

      s.addOrIncreaseEquipment('lantern');
      s.syncStatesToAttributes();
      assert.deepEqual(s.get('equipmentPatterns'), [
        {
          sub_action: [{ equipmentTypeId: 'shooting', count: 1 }],
          feat: [],
          deck: [{ equipmentTypeId: 'torch', count: 2 }, { equipmentTypeId: 'lantern', count: 1 }]
        },
        { sub_action: [], feat: [], deck: [] },
        { sub_action: [], feat: [], deck: [] }
      ]);
    });

    it('syncAttributesToStates', function() {
      let s = new CreatureStore();
      s.get('equipmentPatterns')[0] = {
        sub_action: [{ equipmentTypeId: 'shooting', count: 1 }],
        feat: [],
        deck: [{ equipmentTypeId: 'torch', count: 2 }, { equipmentTypeId: 'lantern', count: 1 }]
      };
      s.syncAttributesToStates();
      assert.deepEqual(s.aggregatedEquipments, {
        sub_action: [
          { equipment: ShootingEquipment, count: 1 }
        ],
        feat: [],
        deck: [
          { equipment: TorchEquipment, count: 2 },
          { equipment: LanternEquipment, count: 1 }
        ]
      });
    });
  });
});
