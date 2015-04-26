import _ from 'lodash';
import rpgparameter from 'rpgparameter';


var ParametersMixin = {};

// 装備力
rpgparameter.defineIntegerParameter(ParametersMixin, 'equipmentPower');

// 最大HP
rpgparameter.defineIntegerParameter(ParametersMixin, 'maxHp');

// 最大手札数
rpgparameter.defineIntegerParameter(ParametersMixin, 'maxHandCardCount');

// 最大キャラクターデッキ枚数
rpgparameter.defineIntegerParameter(ParametersMixin, 'maxDeckCardCount');

// 物理攻撃力
rpgparameter.defineIntegerParameter(ParametersMixin, 'physicalAttackPower');

// 魔法攻撃力、通常0で非表示。基本的に魔法は行動側に総ダメージ値を定義する
rpgparameter.defineIntegerParameter(ParametersMixin, 'magicalAttackPower');

/**
 * 照明範囲と光量
 *
 * 照明範囲は 0(ダンジョンカード全て非表示) を起点として何枚目まで表に出来るか。
 * パーティ内で最も高い人の値が適用される。
 * 光量はそれへの補正値、これは全員の合算が適用される。
 */
rpgparameter.defineIntegerParameter(ParametersMixin, 'illuminationRange', { min: 0 });
rpgparameter.defineIntegerParameter(ParametersMixin, 'light');

/**
 * 行動力
 *
 * 行動力を消費する手札の実行可能回数。
 * 通常は 1 で非表示である。
 */
rpgparameter.defineIntegerParameter(ParametersMixin, 'actionPower', { min: 0 });


export default ParametersMixin;
