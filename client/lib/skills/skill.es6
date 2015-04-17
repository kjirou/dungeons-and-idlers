import _ from 'lodash';
import _s from 'underscore.string';

import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';


var Skill = _.assign({}, NamingMixin, IconizeMixin, {
  typeId: undefined,
  getName() {
    return this._name || _s.titleize(_s.humanize(this.typeId));
  },

  //
  // TODO: パラメーターは基本的にmixinにする、バフでも使うから
  //       attacksUpdateQuery もそうだった
  //

  // 管理用の所属を示す
  //
  //   'attack' 攻撃
  //   'sub_action' 補助行動
  //   'feat' 特性
  //   'deck' デッキ
  //
  // ただ、ゲームデータの作用としてはこの区分に影響されない
  // 例えば、'attack' に指定したものが、攻撃に影響しつつデッキに加算されても良い
  category: undefined,

  // 攻撃リストを更新する
  //
  // e.g.
  //
  //   { 3: 'hard_blow' } -> 3番目をhard_blowにする
  //   { 1: null, 2: null } -> 1,2番目が無くなる
  //   [{ 1: null }, { 2: null }] -> その別記法
  //   { exchange: [2, 3] } -> 2番目と3番目を交換
  //
  attacksUpdateQuery: null
});


export default Skill;
