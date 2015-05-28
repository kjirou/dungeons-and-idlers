import _ from 'lodash';

import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import {getIconClassNameOrError} from 'client/lib/view';


var Route = _.assign({}, NamingMixin, {
  typeId: undefined,
  serialNumber: undefined,

  /**
   * 通過可能か
   */
  isPassable: true,

  /**
   * 視線が通るか
   */
  isTransparent: true,

  /**
   * 各状態別のアイコンID群
   */
  _iconIds: null,
  getIconIds() {
    return _.assign({}, {
      default: 'invalid',
      // 向きがある場合の縦向き
      vertical: 'invalid',
      // 向きがある場合の横向き
      horizontal: 'invalid',
      // 上乗せする障害物が有る場合
      obstacle: 'invalid'
    }, this._iconIds || {});
  }
});


export default Route;
