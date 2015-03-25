import _ from 'lodash';

import {} from 'client/lib/calculation';
import {within} from 'client/lib/core';
import CoreDispatcher from 'client/dispatcher/core';
import Store from 'client/stores/store';


const MIN_MAX_HP = 1;
const MAX_MAX_HP = 9999;
const MIN_ATTACK_POWER = 0;

export default Store.extend({

  _defaults() {
    return {
      name: 'Unknown',
      level: 1,
      hp: MIN_MAX_HP
    };
  },

  defaults() {
    return this._defaults();
  },

  initialize() {
    let self = this;
    this._coreDispatcher = CoreDispatcher.getInstance();

    this.attrGetter('hp');
    this.attrGetter('level');

    this.propGetter('maxHp', '_getMaxHp');
    this.propGetter('name', '_getName');
    this.propGetter('hpRate', '_getHpRate');
    this.propGetter('wound', '_getWound');
    this.propGetter('woundRate', '_getWoundRate');

    //this.dispatchToken = coreDispatcher.register(function({action}) {
    //  switch (action.type) {
    //    case 'change_page':
    //      self.set('pageId', action.pageId);
    //      break;
    //  }
    //});
  },

  // @TODO: たぶん、固有名詞＞(種族|職業)＞初期名 みたいな設定が必要になる
  _getName() {
    return this.get('name');
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
  }
}, {
  MIN_MAX_HP,
  MAX_MAX_HP,
  MIN_ATTACK_POWER
});


//
//  isDead: => @hp is 0
//  isAlive: => not @isDead()
//  isActable: => @isAlive()
//
//  # 状態の不整合を修正する、現在HPが最大HPを超えている状態など
//  # HPが範囲外に設定されることはないが、例えばバフが切れて最大HPが下がることはある
//  adaptStates: =>
//    @healed 0
//
//  # 任意の処理前後で一部のステータスを継続する
//  executeFixedlyStates: (callback) =>
//    beforeHpRate = @hpRate
//    result = callback.call @
//    @_updateHpByRate beforeHpRate
//    result
//
//
//exports.FriendUnitStore = class FriendUnitStore extends UnitStore
//
//
//exports.EnemyUnitStore = class EnemyUnitStore extends UnitStore
