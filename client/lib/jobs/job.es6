import _ from 'lodash';
import _s from 'underscore.string';

import NamingMixin from 'client/lib/mixins/naming';


export default _.assign({}, NamingMixin, {
  typeId: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },
  maxHp: 1,
  physicalAttackPower: 0,
  magicalAttackPower: 0
});
