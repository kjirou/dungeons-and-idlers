import _ from 'lodash';
import _s from 'underscore.string';

import CoreDispatcher from 'client/dispatcher/core';
import CreatureStore from 'client/stores/creatures/creature';
import {jobs} from 'client/lib/jobs';


export default CreatureStore.extend({

  defaults() {
    return _.assign(CreatureStore.prototype.defaults.call(this), {
      jobTypeId: 'dummy'
    });
  },

  initialize(...args) {
    CreatureStore.prototype.initialize.apply(this, ...args);

    this.propGetter('job', '_getJob');
  },

  _getJob() {
    return jobs[this.get('jobTypeId')];
  },

  getName() {
    return CreatureStore.prototype.getName.apply(this) ||
      _s.titleize(_s.humanize(this.job.typeId));
  },

  getIconId() {
    return this.job.getIconId();
  },

  _getBaseMaxHp() {
    return this.job.maxHp;
  },

  _getPhysicalAttackPower() {
    return this.job.physicalAttackPower;
  },

  _getMagicalAttackPower() {
    return this.job.magicalAttackPower;
  },

  _getAttacks() {
    return this.job.attacks;
  },

  _getFeats() {
    return [];
  }
});
