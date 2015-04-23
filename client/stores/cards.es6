import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {skills} from 'client/lib/skills';
import Store from 'client/stores/store';


const MAX_DISPLAY_CARD_COUNT = 99;

let CardsStore = Store.extend({

  storageName: 'store:cards',

  defaults() {
    return {
      cards: [],

      // 仕様変更により削除されたカードリスト
      // restore時に格納される
      deletedCards: []
    };
  },

  initialize() {
    let self = this;
    let coreDispatcher = CoreDispatcher.getInstance();

    /**
     * 所持カードリスト
     *
     * {Array<object>}
     *
     * e.g.
     *   [{
     *     skill: {Skill},
     *     addedAt: {number}
     *   }, ..]
     */
    this._cards = [];

    /**
     * 集計済みカード情報リスト
     * Ref) aggregateCards
     */
    this._aggregatedCards = [];

    /**
     * 種類数カウント集計情報
     */
    this._aggregatedCounts = undefined;
    this._resetAggregatedCounts();

    this.propGetter('cards');
    this.propGetter('aggregatedCounts');

    //let dispatchToken0 = coreDispatcher.register(function({action}) {
    //  switch (action.type) {
    //    case 'change_editing_character':
    //      self.setEditingCharacterIndex(action.characterIndex);
    //      break;
    //    case 'rotate_editing_character':
    //      self.rotateEditingCharacterIndex(action.indexDelta);
    //      break;
    //  }
    //});
    //this.dispatchTokens = [dispatchToken0];
  },

  _resetAggregatedCounts() {
    this._aggregatedCounts = {
      all: 0,
      sub_action: 0,
      feat: 0,
      deck: 0
    };
  },

  /**
   * カードを追加する
   * 表示上の上限は99だが、いくらでも足せる
   * なお、カード削除の予定はない
   * @param {string} skillTypeId
   * @param {object|undefined} options
   */
  addCard(skillTypeId, options) {
    options = _.assign({
      addedAt: (new Date()).getTime()
    }, options || {});
    let skill = skills[skillTypeId];
    if (!skill) {
      throw new Error(`${skillTypeId} is invalid skillTypeId`);
    }
    this.cards.push({
      skill,
      addedAt: options.addedAt
    });
  },

  /**
   * カードデータを作成する
   * @param {string} skillTypeId
   * @param {number} addedAt Timestamp
   * @return {object}
   */
  _createCardData(skillTypeId, addedAt) {
    return {
      skillTypeId,
      addedAt
    };
  },

  syncStatesToAttributes() {
    var cardDataList = this._cards.map((card) => {
      return this._createCardData(card.skill.typeId, card.addedAt);
    });
    this.set('cards', cardDataList, { validate: true });
  },

  /** カードへダミーデータを入れる */
  _addDummyCards() {
    let { skillList } = require('client/lib/skills');
    let skillList3 = skillList.concat(skillList, skillList);
    skillList3.filter(() => {
      return Math.random() < 0.5;
    }).map((skill) => {
      this.addCard(skill.typeId, {
        addedAt: (new Date()).getTime() - ~~(Math.random() * 86400 * 1000 * 7)
      });
    });
    this.aggregateCards();
  },

  syncAttributesToStates() {
    // 削除されたカードのバックアップも行う
    var deletedCardDataList = this.get('deletedCards');
    this.get('cards')
      .filter((cardData) => {
        if (cardData.skillTypeId in skills) {
          return true;
        } else {
          deletedCardDataList.push(_.cloneDeep(cardData));
          return false;
        };
      })
      .forEach((cardData) => {
        this.addCard(cardData.skillTypeId, {
          addedAt: cardData.addedAt
        });
      })
    ;
    this.set('deletedCards', deletedCardDataList, { validate: true });
  },

  restore() {
    return Store.prototype.restore.apply(this)
      .then(() => { this.aggregateCards(); })
    ;
  },

  /**
   * カードを集計して更新する
   *
   * e.g.
   *
   *   from: this._cards
   *   [
   *     { skill: FooSkill, addedAt: 1 },
   *     { skill: BarSkill, addedAt: 2 },
   *     { skill: FooSkill, addedAt: 3 }
   *   ]
   *
   *   to: this._aggregatedCards
   *   [
   *      { skill: FooSkill, lastAddedAt: 3, count: 2 },
   *      { skill: BarSkill, lastAddedAt: 2, count: 1 }
   *   ]
   */
  aggregateCards() {
    let cardsAsDict = {};
    this.cards.forEach((card) => {
      let skillTypeId = card.skill.typeId;
      if (!(skillTypeId in cardsAsDict)) {
        cardsAsDict[skillTypeId] = {
          skill: card.skill,
          lastAddedAt: card.addedAt,
          count: 1
        };
      } else {
        cardsAsDict[skillTypeId].count += 1;
        if (cardsAsDict[skillTypeId].lastAddedAt < card.addedAt) {
          cardsAsDict[skillTypeId].lastAddedAt = card.addedAt;
        }
      }
    });

    this._resetAggregatedCounts();
    this._aggregatedCards = Object.keys(cardsAsDict).map((k) => {
      var aggregatedCard = cardsAsDict[k];
      this._aggregatedCounts.all += 1;
      this._aggregatedCounts[aggregatedCard.skill.category] += 1;
      return aggregatedCard;
    });
  },

  findAggregatedCards(options = {}) {
    options = _.assign({
      conditions: null,
      sort: 'default'
    }, options);
    let results = _.clone(this._aggregatedCards);
    // where
    if (options.conditions) {
      results = _.where(this._aggregatedCards, options.conditions);
    }
    // sort
    let compare = {
      default: (a, b) => {
        return a.skill.serialNumber - b.skill.serialNumber;
      },
      recent: (a, b) => {
        return b.lastAddedAt - a.lastAddedAt;
      }
      // TODO: 仕様次第では重くなるので保留
      //cost_asc: (a, b) => {},
      //cost_desc: (a, b) => {}
    }[options.sort];
    results.sort(compare);
    return results;
  }
}, {
  MAX_DISPLAY_CARD_COUNT
});


export default CardsStore;
