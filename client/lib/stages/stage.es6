import _ from 'lodash';
import _s from 'underscore.string';

import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';


var Stage = _.assign({}, NamingMixin, IconizeMixin, CardifyMixin, {
  typeId: undefined,
  serialNumber: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  isPlayable: true,

  /**
   * 所属フォルダ
   */
  folder: undefined,

  description: '',

  toCardComponentProps() {
    return {
      isFace: true,
      cardBodyType: 'simple',
      cardBodyProps: {
        title: this.getName(),
        iconClassName: this.getIconClassName(),
        description: this.description
      }
    };
  }
});


export default Stage;
