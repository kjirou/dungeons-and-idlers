import _ from 'lodash';
import _s from 'underscore.string';

import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';


var StageFolder = _.assign({}, NamingMixin, IconizeMixin, CardifyMixin, {
  typeId: undefined,
  serialNumber: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  isPlayable: true,

  /**
   * 表示用の難易度
   * @var {number} 1以上の整数
   */
  difficulty: 1,

  /**
   * 概要、一覧に表示される
   *
   * 全てにひとこと入れるのは辛いので、基本は動的生成で敵の種類を出したい
   */
  _summary: '',
  getSummary() {
    return this._summary;
  },

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


export default StageFolder;
