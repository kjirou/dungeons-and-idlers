import _ from 'lodash';
import _s from 'underscore.string';

import CoreDispatcher from 'client/dispatcher/core';
import CreatureStore from 'client/stores/creatures/creature';


export default CreatureStore.extend({

  getName() {
    return CreatureStore.prototype.getName.call(this) ||
      _s.titleize(_s.humanize(this.constructor.typeId));
  },

  _getMaxHpParameters() {
    return [
      ...(CreatureStore.prototype._getMaxHpParameters.call(this)),
      ...[this.constructor.maxHp]
    ];
  },

  _getPhysicalAttackPowerParameters() {
    return [
      ...(CreatureStore.prototype._getPhysicalAttackPowerParameters.call(this)),
      ...[this.constructor.physicalAttackPower]
    ];
  },

  _getMagicalAttackPowerParameters() {
    return [
      ...(CreatureStore.prototype._getMagicalAttackPowerParameters.call(this)),
      ...[this.constructor.magicalAttackPower]
    ];
  },

  _getAttacks() {
    let defaultAttacks = _.range(3).map(() => {
      return { typeId: 'physical_attack', name: '攻撃' };
    });
    let attacks = _.cloneDeep(this.constructor.attacks || defaultAttacks);
    if (attacks.length !== 3) {
      throw new Error('Invalid attacks');
    }
    if (this.constructor.attackUpdates) {
      Object.keys(this.constructor.attackUpdates).forEach((k) => {
        if (['1', '2', '3'].indexOf(k) === -1) {
          throw new Error('Invalid attackUpdates');
        }
        var idx = ~~(k) - 1;
        attacks[idx] = _.cloneDeep(this.constructor.attackUpdates[k]);
      });
    }
    return attacks;
  },

  _getFeats() {
    return [];
  }
}, {
  typeId: undefined,
  maxHp: CreatureStore.MIN_MAX_HP,
  physicalAttackPower: 0,
  magicalAttackPower: 0,
  attacks: null
});
