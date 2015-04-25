import _ from 'lodash';
import rpgparameter from 'rpgparameter';
let aggregators = rpgparameter.aggregators;

import {slideIndex, within} from 'client/lib/core';
import {equipments} from 'client/lib/equipments';
import {jobs} from 'client/lib/jobs';
import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import ParametersMixin from 'client/lib/mixins/parameters';
import Store from 'client/stores/store';


const MIN_MAX_HP = 1;
const MAX_MAX_HP = 9999;

export default Store.extend(_.assign({}, NamingMixin, IconizeMixin, ParametersMixin, CardifyMixin, {

  defaults() {
    return {
      name: '',
      hp: MIN_MAX_HP,
      jobTypeId: 'creature',
      equipmentPatterns: [{}, {}, {}],
      currentEquipmentPatternIndex: 0
    };
  },

  initialize() {

    /**
     * 集計済み装備中カード情報
     */
    this._aggregatedEquipments = {
      // [{ equipment: {Equipment}, count: {number} }, ..]
      sub_action: [],
      feat: [],
      deck: []
    };
    /** 直列に展開した装備中カードリスト */
    this._equipments = [];

    this.attrGetter('hp');
    this.propGetter('aggregatedEquipments');
    this.propGetter('attacks', '_getAttacks');
    this.propGetter('job', '_getJob');
    this.propGetter('name', 'getName');
    this.propGetter('hpRate', '_getHpRate');
    this.propGetter('magicalAttackPower', 'getMagicalAttackPower');
    this.propGetter('maxHp', 'getMaxHp');
    this.propGetter('physicalAttackPower', 'getPhysicalAttackPower');
    this.propGetter('skills', '_getSkills');
    this.propGetter('wound', '_getWound');
    this.propGetter('woundRate', '_getWoundRate');
  },

  getName() {
    return this.get('name') || NamingMixin.getName.call(this);
  },

  _getJob() {
    return jobs[this.get('jobTypeId')];
  },

  /**
   * 装備IDから所属カテゴリの集計済み装備リストを取得し、同時に装備マスタオブジェクトも取得する
   * @return {Array<object>}
   */
  _getAggregatedEquipmentsWithTargetedEquipment(equipmentTypeId) {
    let targetedEquipment = equipments[equipmentTypeId];
    if (!targetedEquipment) {
      throw new Error(equipmentTypeId + ' is invalid equipmentTypeId');
    }
    return [
      this._aggregatedEquipments[targetedEquipment.category],
      targetedEquipment
    ];
  },

  /**
   * 集計済みの装備リストを展開して、フラットなオブジェクトの列にする
   */
  _expandEquipments() {
    this._equipments = [];
    [
      // 順番依存なので Object.keys は NG
      'sub_action', 'feat', 'deck'
    ].forEach((category) => {
      this._aggregatedEquipments[category].forEach((equipmentData) => {
        _.range(equipmentData.count).forEach(() => {
          this._equipments.push(equipmentData.equipment);
        });
      });
    });
  },

  /**
   * 装備を追加または加算する
   *
   * コストや手札数のバリデーションは行わない、
   * いずれにせよ総枚数制限が外部依存なので、全部確認するのは無理だから
   * この辺のバリデーションはパーティ編成後の冒険開始直前に行う
   *
   * @param {string} equipmentTypeId
   */
  addOrIncreaseEquipment(equipmentTypeId) {
    let [equipmentsInCategory, targetedEquipment] =
      this._getAggregatedEquipmentsWithTargetedEquipment(equipmentTypeId);

    if (targetedEquipment.category === 'sub_action' && equipmentsInCategory.length > 0) {
      throw new Error('Can be equipped sub_action only one');
    }

    let existingEquipment = _.find(equipmentsInCategory, (v) => {
      return v.equipment.typeId === targetedEquipment.typeId;
    }) || null;
    if (existingEquipment) {
      existingEquipment.count += 1;
    } else {
      equipmentsInCategory.push({
        equipment: targetedEquipment,
        count: 1
      });
    }

    this._expandEquipments();
    this.trigger(this.constructor.UPDATED_STATE_EVENT);
  },

  /**
   * 装備を削除または減算する
   * その結果残り個数が0になったら要素ごと削除する
   * @param {string} equipmentTypeId
   */
  decreaseOrRemoveEquipment(equipmentTypeId) {
    let [equipmentsInCategory, targetedEquipment] =
      this._getAggregatedEquipmentsWithTargetedEquipment(equipmentTypeId);

    let indexForDelete = null;
    // 指定した装備のカウントを減算
    equipmentsInCategory.some((equipmentData, i) => {
      if (equipmentData.equipment.typeId === targetedEquipment.typeId) {
        equipmentData.count -= 1;
        if (equipmentData.count === 0) {
          indexForDelete = i;
        }
        return true;
      }
      return false;
    });
    // もし0個になっていれば要素削除
    if (indexForDelete !== null) {
      equipmentsInCategory.splice(indexForDelete, 1);
    }

    this._expandEquipments();
    this.trigger(this.constructor.UPDATED_STATE_EVENT);
  },

  /**
   * 同カテゴリ内で並び順を変更する
   *
   * @param {string} equipmentTypeId
   * @param {number} relativeIndex
   */
  slideEquipment(equipmentTypeId, relativeIndex) {
    let [equipmentsInCategory, targetedEquipment] =
      this._getAggregatedEquipmentsWithTargetedEquipment(equipmentTypeId);

    let startIndex = null;
    equipmentsInCategory.some((v, i) => {
      if (v.equipment.typeId === targetedEquipment.typeId) {
        startIndex = i;
        return true;
      }
      return false;
    });

    if (startIndex !== null) {
      slideIndex(equipmentsInCategory, startIndex, relativeIndex, true);
      this._expandEquipments();
    }
    this.trigger(this.constructor.UPDATED_STATE_EVENT);
  },

  _getMaxHpParameters() {
    return [
      this.getRawMaxHp(),
      this.job.getMaxHp()
    ];
  },
  getMaxHp() {
    let parameter = aggregators.aggregateIntegers(this._getMaxHpParameters());
    return within(parameter, MIN_MAX_HP, MAX_MAX_HP);
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
   * 全ての状態を初期化する
   *
   * 良い効果も消すので、いわゆる「全快」ではない
   * ゲーム内で使うような処理ではない
   */
  resetStates() {
    this.beHealedFully();
    this.adaptStates();
    // TODO: バフ削除
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

  _getPhysicalAttackPowerParameters() {
    return [
      this.getRawPhysicalAttackPower(),
      this.job.getPhysicalAttackPower()
    ];
  },
  getPhysicalAttackPower() {
    return aggregators.aggregateIntegers(this._getPhysicalAttackPowerParameters());
  },

  _getMagicalAttackPowerParameters() {
    return [
      this.getRawMagicalAttackPower(),
      this.job.getMagicalAttackPower()
    ];
  },
  getMagicalAttackPower() {
    return aggregators.aggregateIntegers(this._getMagicalAttackPowerParameters());
  },

  /**
   * 攻撃リストを返す
   * @return {Array} 要素数は常に3
   */
  _getAttacks() {
    throw new Error('Not implemented');
  },

  /**
   * スキルリストを返す
   * @return {Array} 要素数は0以上
   */
  _getSkills() {
    throw new Error('Not implemented');
  },

  _toCardBodyComponentProps() {
    return _.assign(
      _.pick(this, 'hp', 'maxHp', 'physicalAttackPower', 'attacks', 'skills'),
      {
        iconClassName: this.getIconClassName(),
        subActionName: '補助行動無し'
      }
    );
  },

  toCardComponentProps() {
    return {
      isFace: this.isFace(),
      cardBodyType: 'creature',
      cardBodyProps: this._toCardBodyComponentProps()
    };
  }
}), {
  MIN_MAX_HP,
  MAX_MAX_HP
});
