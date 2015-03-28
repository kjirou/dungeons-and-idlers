import _ from 'lodash';
import _s from 'underscore.string';

import CoreDispatcher from 'client/dispatcher/core';
import CreatureStore from 'client/stores/creatures/creature';


export default CreatureStore.extend({

  getName() {
    return CreatureStore.prototype.getName.apply(this) ||
      _s.titleize(_s.humanize(this.constructor.typeId));
  },

  _getBaseMaxHp() {
    return this.constructor.maxHp;
  },

  _getPhysicalAttackPower() {
    return this.constructor.physicalAttackPower;
  },

  _getMagicalAttackPower() {
    return this.constructor.magicalAttackPower;
  },

  getActions() {
    let actions = _.cloneDeep(this.constructor.actions || []);
    return actions;
  }
}, {
  typeId: undefined,
  maxHp: CreatureStore.MIN_MAX_HP,
  physicalAttackPower: 0,
  magicalAttackPower: 0,
  actions: null
});
