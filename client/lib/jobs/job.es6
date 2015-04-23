import _ from 'lodash';
import _s from 'underscore.string';

import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import ParametersMixin from 'client/lib/mixins/parameters';


export default _.assign({}, NamingMixin, IconizeMixin, ParametersMixin, {
  typeId: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },
  isPlayable: true,
  _maxHandCardCount: 3,
  attacks: [
    { typeId: 'physical_attack', name: '打撃' },
    { typeId: 'physical_attack', name: '打撃' },
    { typeId: 'physical_attack', name: '打撃' }
  ]
});
