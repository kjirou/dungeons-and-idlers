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

    this.propGetter('cards');

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
  }
}, {
  MAX_DISPLAY_CARD_COUNT
});


export default CardsStore;
