import _ from 'lodash';

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

    //this.attrGetter('pageId');

    //this.dispatchToken = coreDispatcher.register(function({action}) {
    //  switch (action.type) {
    //    case 'change_page':
    //      self.set('pageId', action.pageId);
    //      break;
    //  }
    //});
  }
}, {
  MIN_MAX_HP,
  MAX_MAX_HP,
  MIN_ATTACK_POWER
});


//calculation = require 'client/lib/calculation'
//core = require 'client/lib/core'
//{Store} = require 'client/stores/store'
//
//
//
//  @MIN_ABILITY: 1
//  @HP_PER_LEVEL: 5
//  @MIN_MAX_HP: 5
//  @MAX_MAX_HP: 99999999
//
//
//  initialize: ->
//    @propGetter 'agility', '_getAgility'
//    @attrGetter 'hp'
//    @propGetter 'hpRate', '_getHpRate'
//    @propGetter 'intelligence', '_getIntelligence'
//    @attrGetter 'level'
//    @propGetter 'maxHp', '_getMaxHp'
//    @attrGetter 'name'
//    @attrGetter 'rawAgility', 'agility'
//    @attrGetter 'rawIntelligence', 'intelligence'
//    @attrGetter 'rawStrength', 'strength'
//    @propGetter 'strength', '_getStrength'
//    @propGetter 'wound', '_getWound'
//    @propGetter 'woundRate', '_getWoundRate'
//
//  _computeBaseMaxHp: =>
//    @constructor.MIN_MAX_HP + @constructor.HP_PER_LEVEL * @level
//
//  _getStrength: =>
//    t = @rawStrength
//    Math.max t, 1
//
//  _getAgility: =>
//    t = @rawAgility
//    Math.max t, 1
//
//  _getIntelligence: =>
//    t = @rawIntelligence
//    Math.max t, 1
//
//  _increaseAbility: (abilityType, delta) =>
//    nextValue = @[abilityType] + delta
//    nextValue = Math.max nextValue, @constructor.MIN_ABILITY
//    @set abilityType, nextValue, validate: true
//  increaseStrength: (delta) => @_increaseAbility 'strength', delta
//  increaseAgility: (delta) => @_increaseAbility 'agility', delta
//  increaseIntelligence: (delta) => @_increaseAbility 'intelligence', delta
//
//  _getMaxHp: =>
//    b = @_computeBaseMaxHp()
//    r = calculation.sumRates [
//      0.75 + @strength * 0.05
//    ]
//    t = Math.ceil b * r
//    core.within t, @constructor.MIN_MAX_HP, @constructor.MAX_MAX_HP
//
//  _getWound: => @maxHp - @hp
//  _getHpRate: => core.within @hp / @maxHp, 0.0, 1.0
//  _getWoundRate: => 1.0 - @hpRate
//  isFullHp: => @hpRate >= 1.0  # バフ効果時間切れのmax-hp低下でオーバーしたことがあったので完全一致は後で
//
//  _updateHp: (nextHp) =>
//    nextHp = core.within nextHp, 0, @maxHp
//    @set 'hp', nextHp, validate: true
//  _updateHpByRate: (nextHpRate) =>
//    nextHp = Math.ceil @maxHp * nextHpRate
//    @_updateHp nextHp
//
//  healed: (delta) =>
//    nextHp = @hp + delta
//    @_updateHp nextHp
//    delta
//  healedByRate: (rate) =>
//    delta = Math.ceil @maxHp * rate
//    @healed delta
//  healedFully: => @healedByRate 1.0
//
//  damaged: (delta, options={}) =>
//    options = _.extend {
//      # trueなら必ずHPが1残る
//      shouldSurvive: false
//    }, options
//    nextHp = @hp - delta
//    nextHp = 1 if nextHp <= 0 and options.shouldSurvive
//    @_updateHp nextHp
//    delta
//  damagedByRate: (rate, options={}) =>
//    delta = Math.ceil @maxHp * rate
//    @damaged delta, options
//  damagedFully: => @damagedByRate 1.0
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
