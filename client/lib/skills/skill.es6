import _ from 'lodash';
import _s from 'underscore.string';

import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import ParametersMixin from 'client/lib/mixins/parameters';


var Skill = _.assign({}, NamingMixin, IconizeMixin, ParametersMixin, {
  typeId: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  /**
   * 管理用の所属を示す
   *
   *   "sub_action" = 補助行動
   *   "deck" = デッキ、手札になるもの
   *   "skill" = その他的な扱い、主に特性付与や攻撃リスト修正
   *
   * ただし、実際の作用としてはこの区分に影響されない
   * 例えば、'deck' に指定したものが、手札を増加しつつ特性を付与することも有る
   */
  category: 'skill',

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
  attacksUpdateQuery: null
});


export default Skill;
