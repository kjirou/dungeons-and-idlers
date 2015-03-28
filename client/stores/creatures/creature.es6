import _ from 'lodash';

import {within} from 'client/lib/core';
import NamingMixin from 'client/lib/mixins/naming';
import CoreDispatcher from 'client/dispatcher/core';
import Store from 'client/stores/store';


const MIN_MAX_HP = 1;
const MAX_MAX_HP = 9999;
const MIN_ATTACK_POWER = 0;

export default Store.extend(_.assign({}, NamingMixin, {

  defaults() {
    return {
      name: '',
      level: 1,
      hp: MIN_MAX_HP
    };
  },

  initialize() {
    this._coreDispatcher = CoreDispatcher.getInstance();

    this.attrGetter('hp');
    this.attrGetter('level');

    this.propGetter('maxHp', '_getMaxHp');
    this.propGetter('name', 'getName');
    this.propGetter('hpRate', '_getHpRate');
    this.propGetter('magicalAttackPower', '_getMagicalAttackPower');
    this.propGetter('physicalAttackPower', '_getPhysicalAttackPower');
    this.propGetter('wound', '_getWound');
    this.propGetter('woundRate', '_getWoundRate');
  },

  getName() {
    return this.get('name') || NamingMixin.getName.call(this);
  },

  /**
   * キャラクターとモンスターで基底値の源泉が異なるので、
   * そこをオーバーライドして吸収する
   * キャラは職業ベース、モンスターはそのままモンスターの種別
   */
  _getBaseMaxHp() {
    return MIN_MAX_HP;
  },

  _getMaxHp() {
    let b = this._getBaseMaxHp();
    return within(b, MIN_MAX_HP, MAX_MAX_HP);
  },

  _getWound() {
    return Math.max(this.maxHp - this.hp, 0);
  },

  _getHpRate() {
    return within(this.hp / this.maxHp, 0, 1);
  },

  _getWoundRate() {
    return 1.0 - this.hpRate;
  },

  isFullHp() {
    // TODO:
    // バフ効果切れで現HPが最大値を超えることがあったので
    // それが担保されるまではこの判定
    return this.hpRate >= 1.0;
  },

  _updateHp(nextHp) {
    let nextHp = within(nextHp, 0, this.maxHp);
    this.set('hp', nextHp, { validate: true });
  },

  _updateHpByRate(nextHpRate) {
    let nextHp = Math.ceil(this.maxHp * nextHpRate);
    this._updateHp(nextHp);
  },

  beHealed(points) {
    points = Math.max(points, 0);
    let nextHp = this.hp + points;
    this._updateHp(nextHp);
    return points;
  },

  beHealedByRate(rate) {
    let points = Math.ceil(this.maxHp * rate);
    return this.beHealed(points);
  },

  beHealedFully() {
    return this.beHealedByRate(1);
  },

  beDamaged(points, options = {}) {
    options = _.assign({
      // true の場合、HP が 1 未満にならない
      shouldSurvive: false
    }, options);
    let points = Math.max(points, 0);
    let nextHp = this.hp - points;
    if (options.shouldSurvive && nextHp < 1) nextHp = 1;
    this._updateHp(nextHp);
    return points;
  },

  beDamagedByRate(rate) {
    let points = Math.ceil(this.maxHp * rate);
    return this.beDamaged(points);
  },

  beDamagedFully() {
    return this.beDamagedByRate(1);
  },

  isDead() {
    return this.hp === 0;
  },

  isAlive() {
    return !this.isDead();
  },

  isActable() {
    return this.isAlive();
  },

  /**
   * 現在HPが最大HPを超えている状態などの、状態の不整合を修正する
   * HPが範囲外に設定されることはないが、例えばバフが切れて最大HPが下がることはある
   */
  adaptStates() {
    this.beHealed(0);
  },

  /**
   * 処理前後で一部の状態を継続する
   * HPの割合を維持したまま最大値を変更したり
   */
  executeFixedlyStates(callback) {
    let beforeHpRate = this.hpRate;
    let result = callback.call(this);
    this._updateHpByRate(beforeHpRate);
    this.adaptStates();
    return result;
  },

  _getPhysicalAttackPower() {
    return 0;
  },

  _getMagicalAttackPower() {
    return 0;
  }
}), {
  MIN_MAX_HP,
  MAX_MAX_HP,
  MIN_ATTACK_POWER
});
