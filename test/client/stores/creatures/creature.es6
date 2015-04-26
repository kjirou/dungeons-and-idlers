import assert from 'assert';
import isInteger from 'is-integer';
import sinon from 'sinon';

import {DartEquipment, LanternEquipment, ShootingEquipment, TorchEquipment} from 'client/lib/equipments';
import CreatureStore from 'client/stores/creatures/creature';


describe('client/stores/creatures/creature module', function() {

  beforeEach(function() {
    this.mocks = [];
  });

  afterEach(function() {
    this.mocks.forEach((v) => { v.restore(); });
  });


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


  context('parameters', function() {

    it('equipmentPower', function() {
      let s = new CreatureStore();
      let standardValue = s.getEquipmentPower();
      // raw
      s.set('equipmentPower', s.get('equipmentPower') + 1)
      assert.strictEqual(s.getEquipmentPower(), standardValue + 1);
      // job
      let originalJobValue = s.job.getEquipmentPower();
      this.mocks.push(
        sinon.stub(s.job, 'getEquipmentPower', () => { return originalJobValue - 1; })
      );
      assert.strictEqual(s.getEquipmentPower(), standardValue);
      // equipments
      s._equipments.push({ getEquipmentPower() { return 1; } });
      assert.strictEqual(s.getEquipmentPower(), standardValue + 1);
    });

    it('maxHp', function() {
      let s = new CreatureStore();
      let standardValue = s.getMaxHp();
      // raw
      s._maxHp = s._maxHp + 1;
      assert.strictEqual(s.getMaxHp(), standardValue + 1);
      // job
      let originalJobValue = s.job.getMaxHp();
      this.mocks.push(
        sinon.stub(s.job, 'getMaxHp', () => { return originalJobValue - 1; })
      );
      assert.strictEqual(s.getMaxHp(), standardValue);
      // equipments
      s._equipments.push({ getMaxHp() { return 1; } });
      assert.strictEqual(s.getMaxHp(), standardValue + 1);
      // limited
      s._maxHp = -999999;
      assert.strictEqual(s.getLimitedMaxHp(), CreatureStore.MIN_MAX_HP);
      s._maxHp = 999999;
      assert.strictEqual(s.getLimitedMaxHp(), CreatureStore.MAX_MAX_HP);
    });

    it('maxHandCardCount', function() {
      let s = new CreatureStore();
      let standardValue = s.getMaxHandCardCount();
      // raw
      s._maxHandCardCount = s._maxHandCardCount + 1;
      assert.strictEqual(s.getMaxHandCardCount(), standardValue + 1);
      // job
      let originalJobValue = s.job.getMaxHandCardCount();
      this.mocks.push(
        sinon.stub(s.job, 'getMaxHandCardCount', () => { return originalJobValue - 1; })
      );
      assert.strictEqual(s.getMaxHandCardCount(), standardValue);
      // equipments
      s._equipments.push({ getMaxHandCardCount() { return 1; } });
      assert.strictEqual(s.getMaxHandCardCount(), standardValue + 1);
    });

    it('maxDeckCardCount', function() {
      let s = new CreatureStore();
      let standardValue = s.getMaxDeckCardCount();
      // raw
      s._maxDeckCardCount = s._maxDeckCardCount + 1;
      assert.strictEqual(s.getMaxDeckCardCount(), standardValue + 1);
      // job
      let originalJobValue = s.job.getMaxDeckCardCount();
      this.mocks.push(
        sinon.stub(s.job, 'getMaxDeckCardCount', () => { return originalJobValue - 1; })
      );
      assert.strictEqual(s.getMaxDeckCardCount(), standardValue);
      // equipments
      s._equipments.push({ getMaxDeckCardCount() { return 1; } });
      assert.strictEqual(s.getMaxDeckCardCount(), standardValue + 1);
    });

    it('physicalAttackPower', function() {
      let s = new CreatureStore();
      let standardValue = s.getPhysicalAttackPower();
      // raw
      s._physicalAttackPower = s._physicalAttackPower + 1;
      assert.strictEqual(s.getPhysicalAttackPower(), standardValue + 1);
      // job
      let originalJobValue = s.job.getPhysicalAttackPower();
      this.mocks.push(
        sinon.stub(s.job, 'getPhysicalAttackPower', () => { return originalJobValue - 1;; })
      );
      assert.strictEqual(s.getPhysicalAttackPower(), standardValue);
      // equipments
      s._equipments.push({ getPhysicalAttackPower() { return 1; } });
      assert.strictEqual(s.getPhysicalAttackPower(), standardValue + 1);
    });

    it('magicalAttackPower', function() {
      let s = new CreatureStore();
      let standardValue = s.getMagicalAttackPower();
      // raw
      s._magicalAttackPower = s._magicalAttackPower + 1;
      assert.strictEqual(s.getMagicalAttackPower(), standardValue + 1);
      // job
      let originalJobValue = s.job.getPhysicalAttackPower();
      this.mocks.push(
        sinon.stub(s.job, 'getMagicalAttackPower', () => { return originalJobValue - 1;; })
      );
      assert.strictEqual(s.getMagicalAttackPower(), standardValue);
      // equipments
      s._equipments.push({ getMagicalAttackPower() { return 1; } });
      assert.strictEqual(s.getMagicalAttackPower(), standardValue + 1);
    });

    it('toCardComponentProps', function() {
      let s = new CreatureStore();
      s._getAttacks = () => { return []; }
      s._getSkills = () => { return []; }
      s._maxHp = -9999;
      assert.strictEqual(s.toCardComponentProps().cardBodyProps.maxHp, 1);
      assert(s.toCardComponentProps({ isPreview: true }).cardBodyProps.maxHp < 0);
      assert.strictEqual(s.toCardComponentProps({ isPreview: true }).cardBodyProps.hp, 1);
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

    it('countEquipmentByCategory', function() {
      let s = new CreatureStore();
      assert.strictEqual(s.countEquipmentByCategory('sub_action'), 0);
      assert.strictEqual(s.countEquipmentByCategory('feat'), 0);
      assert.strictEqual(s.countEquipmentByCategory('deck'), 0);
      [
        'shooting',
        'torch', 'torch', 'lantern'
      ].forEach((typeId) => {
        s.addOrIncreaseEquipment(typeId);
      });
      assert.strictEqual(s.countEquipmentByCategory('sub_action'), 1);
      assert.strictEqual(s.countEquipmentByCategory('feat'), 0);
      assert.strictEqual(s.countEquipmentByCategory('deck'), 3);
    });

    it('computeEquipmentCost', function() {
      let s = new CreatureStore();
      assert.strictEqual(s.computeEquipmentCost(), 0);
      let lanternCost = LanternEquipment.getEquipmentCost();
      s.addOrIncreaseEquipment('lantern');
      assert.strictEqual(s.computeEquipmentCost(), lanternCost);
      s.addOrIncreaseEquipment('lantern');
      assert.strictEqual(s.computeEquipmentCost(), lanternCost * 2);
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

    it('changeEquipmentPattern', function() {
      let s = new CreatureStore();

      assert.throws(() => {
        s.changeEquipmentPattern(3);
      }, /3/);
      assert.throws(() => {
        s.changeEquipmentPattern(-1);
      }, /-1/);

      assert.strictEqual(s.currentEquipmentPatternIndex, 0);

      s.addOrIncreaseEquipment('torch');
      assert.deepEqual(s.aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: [{ equipment: TorchEquipment, count: 1 }]
      });
      assert.deepEqual(s._equipments, [
        TorchEquipment
      ]);

      s.changeEquipmentPattern(1);
      assert.deepEqual(s.aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: []
      });
      assert.deepEqual(s._equipments, []);

      s.addOrIncreaseEquipment('shooting');
      assert.deepEqual(s.aggregatedEquipments, {
        sub_action: [{ equipment: ShootingEquipment, count: 1 }],
        feat: [],
        deck: []
      });

      s.changeEquipmentPattern(0);
      assert.deepEqual(s.aggregatedEquipments, {
        sub_action: [],
        feat: [],
        deck: [{ equipment: TorchEquipment, count: 1 }]
      });
      assert.deepEqual(s._equipments, [
        TorchEquipment
      ]);
    });
  });
});
