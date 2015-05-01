import _ from 'lodash';
import _s from 'underscore.string';

import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';


var Stage = _.assign({}, NamingMixin, IconizeMixin, CardifyMixin, {

  /**
   * "world" が、エントリポイントとなる全体マップを示す予約キー
   */
  typeId: undefined,

  serialNumber: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  isPlayable: true,

  /**
   * 地図データ
   *
   * @var {Array<array<object>>}  2D配列
   *
   * 6 * n のステージと、その間をつなぐルートを表現する
   * 6 はステージ数なので、ルート含めると最大要素数は横幅 11 になる、縦幅は制約なし
   * 縦横どちらも、ステージが端に来る必要があるため、要素数は奇数である
   *
   * e.g.
   *
   *   [
   *     [{ステージ1}, {ルート1}, {ステージ2}, {ルート2}, .. {ステージ6}],
   *     [  {ルート1},    {null},   {ルート2},    {null}, ..   {ルート6}],
   *     ..
   *   ]
   *
   * {カード} は、ステージ本体か、子マップの場合はステージのtypeId のどちらかが入る
   * {ルート} は、上下もしくは左右への道を表す。扉など障害物有無の設定と、それらの除去に関する状態を持つ
   * {null}   は、何もない状態を示す
   */
  map: [],

  /**
   * 所属フォルダ (廃止予定)
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
