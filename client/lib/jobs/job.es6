import _ from 'lodash';
import _s from 'underscore.string';

import NamingMixin from 'client/lib/mixins/naming';


export default _.assign({}, NamingMixin, {
  typeId: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },
  isPlayable: true,
  maxHp: 1,
  maxHandCard: 3,
  physicalAttackPower: 0,
  magicalAttackPower: 0
});
