import _ from 'lodash';
import RPGLevel from 'rpglevel';

import Store from 'client/stores/store';


const BASE_NECESSARY_FAME_EXP_PER_LEVEL = 100;

let PlayerStore = Store.extend({

  storageName: 'store:player',

  defaults() {
    return {
      // TODO: 経験値テーブルを変更した際に現レベルが上下しないようにする
      //       落ち着いたらでいい
      fameExp: 0
    };
  },

  initialize() {
    Store.prototype.initialize.apply(this);

    this._fameLevelObject = new RPGLevel();
    this._fameLevelObject.defineExpTable((level) => {
      let fromLevel = level - 1;
      let baseExp = fromLevel * BASE_NECESSARY_FAME_EXP_PER_LEVEL;
      let correctionRate = 1.0 + fromLevel * 0.002;
      return Math.ceil(baseExp * correctionRate);
    }, {
      maxLevel: 999
    });

    this.propGetter('fameLevel', '_getFameLevel');

    this.syncAttributesToStates();
  },

  syncAttributesToStates() {
    this._fameLevelObject.setExp(this.get('fameExp'));
  },

  syncStatesToAttributes() {
    this.set('fameExp', this._fameLevelObject.getExp(), { validate: true });
  },

  _getFameLevel() {
    return this._fameLevelObject.getLevel();
  },

  gainFameExp(exp) {
    this._fameLevelObject.gainExp(exp);
    this.emitChange();
  },

  /**
   * 名声レベルによる各キャラクターの装備力への補正値を返す
   * @return {number}
   */
  computeEquipmentPower() {
    return parseInt(this.fameLevel / 10, 10);
  }
}, {
  BASE_NECESSARY_FAME_EXP_PER_LEVEL
});


export default PlayerStore;
