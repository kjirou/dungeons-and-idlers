import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {rotateIndex} from 'client/lib/core';
import {jobs, playableJobList} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import Store from 'client/stores/store';


let CharactersStoe = Store.extend({

  storageName: 'store:characters',

  defaults() {
    let characters = playableJobList.map((job) => {
      return {
        jobTypeId: job.typeId
      };
    });

    return {
      characters,
      editingCharacterIndex: 0
    };
  },

  initialize(attrs, { playerStore }) {
    Store.prototype.initialize.apply(this);

    this._deps = {
      playerStore
    };

    let coreDispatcher = CoreDispatcher.getInstance();
    let dispatchToken0 = coreDispatcher.register(({action}) => {
      coreDispatcher.waitFor([
        ...playerStore.dispatchTokens
      ]);

      switch (action.type) {
        case 'changeEditingCharacter':
          this.setEditingCharacterIndex(action.characterIndex);
          this.emitChange();
          break;
        case 'rotateEditingCharacter':
          this.rotateEditingCharacterIndex(action.indexDelta);
          this.emitChange();
          break;
        case 'addOrIncreaseEditingCharacterEquipment':
          this.editingCharacter.addOrIncreaseEquipment(action.equipmentTypeId);
          this.emitChange();
          break;
        case 'decreaseOrRemoveEditingCharacterEquipment':
          this.editingCharacter.decreaseOrRemoveEquipment(action.equipmentTypeId);
          this.emitChange();
          break;
        case 'slideEditingCharacterEquipment':
          this.editingCharacter.slideEquipment(action.equipmentTypeId, action.relativeIndex);
          this.emitChange();
          break;
        case 'changeEditingCharacterEquipmentPattern':
          this.editingCharacter.changeEquipmentPattern(action.nextEquipmentPatternIndex);
          this.emitChange();
          break;
      }
    });
    let dispatchToken1 = coreDispatcher.register(({action}) => {
      coreDispatcher.waitFor([
        ...playerStore.dispatchTokens,
        dispatchToken0
      ]);

      switch (action.type) {
        case 'storeCharacters':
          this.store();
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0, dispatchToken1];

    this._characters = [];

    this.attrGetter('editingCharacterIndex');
    this.propGetter('characters');
    this.propGetter('editingCharacter', '_getEditingCharacter');

    this.syncAttributesToStates();
  },

  syncAttributesToStates() {
    this._characters = this.get('characters').map((characterAttrs) => {
      let character = new CharacterStore(_.assign({}, characterAttrs, {
        // TODO: 名声レベル変更時に反映する
        //       経験値獲得処理次第で監視イベントが変わりそうなので保留にしている
        equipmentPower: this._deps.playerStore.computeEquipmentPower()
      }));
      character.resetStates();
      return character;
    });
  },

  syncStatesToAttributes() {
    let stateOfCharacters = this._characters.map((character) => {
      character.syncStatesToAttributes();
      return _.cloneDeep(character.attributes);
    });
    this.set('characters', stateOfCharacters, { validate: true });
  },

  setEditingCharacterIndex(value) {
    if (this.characters[value] === undefined) {
      value = this.defaults().editingCharacterIndex;
    }
    this.set('editingCharacterIndex', value, { validate: true });
  },

  rotateEditingCharacterIndex(indexDelta) {
    let nextIndex = rotateIndex(this.characters.length, this.editingCharacterIndex, indexDelta);
    this.setEditingCharacterIndex(nextIndex);
  },

  _getEditingCharacter() {
    return this.characters[this.editingCharacterIndex];
  }
});


export default CharactersStoe;
