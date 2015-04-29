import _ from 'lodash';
import _s from 'underscore.string';

import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import ParametersMixin from 'client/lib/mixins/parameters';


//
// TODO: データ定義
//
// - 対象の指定
// - バフ/デバフ付与の指定
// - 即行動の場合の指定(照明や射撃など)
//   - 対象選定と効果を分離するために、[射撃1] [射撃2] とかは別定義にした方がいい
//


var Equipment = _.assign({}, NamingMixin, IconizeMixin, ParametersMixin, CardifyMixin, {
  typeId: undefined,
  serialNumber: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  /**
   * 管理用の所属を示す
   *
   *   "sub_action" = 補助行動
   *   "feat" = パッシブスキル付与や攻撃リスト修正
   *   "deck" = デッキ、手札になるもの
   *
   * ただし、実際の作用としてはこの区分に影響されない
   * 例えば、'deck' に指定したものが、手札を増加しつつ特性を付与することも有る
   */
  category: undefined,

  /**
   * 装備部位
   *
   * feat の一部にのみ設定され、重複する箇所は 1 つしか装備できない
   * 主要能力値の上昇は、例えば武器=攻撃力のように装備の特定箇所に限定し、上昇量を管理するため
   *
   * "weapon" = 武器、物理/魔法攻撃力上昇
   * "armor"  = 鎧、HP上昇
   * "shield" = 盾、物理/魔法/属性防御力
   */
  equipmentPart: null,
  getEquipmentPartName() {
    return !this.equipmentPart ? '' : {
      weapon: '武器',
      armor: '鎧',
      shield: '盾'
    }[this.equipmentPart];
  },

  /**
   * レアリティ
   * @var {number} 1 から 8 の範囲, 高いほどレア
   */
  rarity: 1,

  /**
   * 概要と詳細説明文
   *
   * TODO: どちらもデフォルトで自動生成したい
   */
  _summary: '',
  getSummary() {
    return this._summary;
  },
  _description: '',
  getDescription() {
    return this._description;
  },

  /**
   * 装備コスト
   *
   * TODO: 職業別に変える、少なくとも得手不得手はつくれないといけない
   */
  _equipmentCost: 0,
  getEquipmentCost() {
    return this._equipmentCost;
  },

  /**
   * 手札として使用する際の消費行動力
   *
   * 現在は 1 or 0 のみ
   */
  actionPowerCost: 1,

  /**
   * 攻撃リストを更新する
   *
   * e.g.
   *   { 3: 'hard_blow' } -> 3番目をhard_blowにする
   *   { 1: null, 2: null } -> 1,2番目が無くなる
   *   [{ 1: null }, { 2: null }] -> その別記法
   *   { exchange: [2, 3] } -> 2番目と3番目を交換
   *
   * 指定順により結果が変わることがある
   */
  attacksUpdateQuery: null,

  toCardComponentProps() {
    return {
      isFace: true,
      cardBodyType: 'simple',
      cardBodyProps: {
        title: this.getName(),
        category: this.category,
        iconClassName: this.getIconClassName(),
        rarity: this.rarity,
        equipmentPartName: this.getEquipmentPartName(),
        description: this.getSummary()
      }
    };
  }
});


export default Equipment;
