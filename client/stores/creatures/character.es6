import _ from 'lodash';
import _s from 'underscore.string';

import CoreDispatcher from 'client/dispatcher/core';
import CreatureStore from 'client/stores/creatures/creature';
import {jobs} from 'client/lib/jobs';


export default CreatureStore.extend({

  getName() {
    return CreatureStore.prototype.getName.apply(this) ||
      _s.titleize(_s.humanize(this.job.typeId));
  },

  getIconId() {
    return this.job.getIconId();
  },

  _getAttacks() {
    return this.job.attacks;
  },

  _getFeats() {
    return [];
  }
});
