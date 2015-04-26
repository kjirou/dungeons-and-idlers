import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {rotateIndex} from 'client/lib/core';
import {jobs, playableJobList} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import Store from 'client/stores/store';


const UPDATED_EDITING_CHARACTER_EVENT = 'UPDATED_EDITING_CHARACTER_EVENT';
const UPDATED_EDITING_CHARACTER_STATE_EVENT = 'UPDATED_EDITING_CHARACTER_STATE_EVENT';

export default Store.extend({

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

  initialize() {
    let self = this;
    let coreDispatcher = CoreDispatcher.getInstance();

    let dispatchToken0 = coreDispatcher.register(function({action}) {
      switch (action.type) {
        case 'changeEditingCharacter':
          self.setEditingCharacterIndex(action.characterIndex);
          self.trigger(UPDATED_EDITING_CHARACTER_EVENT);
          break;
        case 'rotateEditingCharacter':
          self.rotateEditingCharacterIndex(action.indexDelta);
          self.trigger(UPDATED_EDITING_CHARACTER_EVENT);
          break;
        case 'addOrIncreaseEditingCharacterEquipment':
          self.getEditingCharacter().addOrIncreaseEquipment(action.equipmentTypeId);
          self.trigger(UPDATED_EDITING_CHARACTER_STATE_EVENT);
          break;
        case 'decreaseOrRemoveEditingCharacterEquipment':
          self.getEditingCharacter().decreaseOrRemoveEquipment(action.equipmentTypeId);
          self.trigger(UPDATED_EDITING_CHARACTER_STATE_EVENT);
          break;
        case 'slideEditingCharacterEquipment':
          self.getEditingCharacter().slideEquipment(action.equipmentTypeId, action.relativeIndex);
          self.trigger(UPDATED_EDITING_CHARACTER_STATE_EVENT);
          break;
        case 'changeEditingCharacterEquipmentPattern':
          self.getEditingCharacter().changeEquipmentPattern(action.nextEquipmentPatternIndex);
          self.trigger(UPDATED_EDITING_CHARACTER_STATE_EVENT);
          break;
      }
    });
    let dispatchToken1 = coreDispatcher.register(function({action}) {
      coreDispatcher.waitFor([
        dispatchToken0
      ]);
      switch (action.type) {
        case 'storeCharacters':
          self.store();
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0, dispatchToken1];

    this._characters = [];

    this.attrGetter('editingCharacterIndex');
    this.propGetter('characters');

    this.syncAttributesToStates();
  },

  syncStatesToAttributes() {
    let stateOfCharacters = this._characters.map((character) => {
      character.syncStatesToAttributes();
      return _.cloneDeep(character.attributes);
    });
    this.set('characters', stateOfCharacters, { validate: true });
  },

  syncAttributesToStates() {
    this._characters = this.get('characters').map((characterAttrs) => {
      let character = new CharacterStore(characterAttrs);
      character.resetStates();
      return character;
    });
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

  // TODO: 常に誰かが存在してnullを返さないようにしたので、反映する
  getEditingCharacter() {
    return this.characters[this.editingCharacterIndex] || null;
  }
}, {
  UPDATED_EDITING_CHARACTER_EVENT,
  UPDATED_EDITING_CHARACTER_STATE_EVENT
});
