import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {rotateIndex} from 'client/lib/core';
import {jobs, playableJobList} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import Store from 'client/stores/store';


const UPDATED_EDITING_CHARACTER_EVENT = 'UPDATED_EDITING_CHARACTER_EVENT';

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
        case 'change_editing_character':
          self.setEditingCharacterIndex(action.characterIndex);
          break;
        case 'rotate_editing_character':
          self.rotateEditingCharacterIndex(action.indexDelta);
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0];

    this._characters = [];

    this.attrGetter('editingCharacterIndex');
    this.propGetter('characters');
  },

  store() {
    let charactersStates = this._characters.map((character) => {
      return character.toStates();
    });
    this.set('characters', charactersStates, { validate: true });
    return this.save();
  },

  restore() {
    this.fetch()
      .then(() => {
        this._characters = this.get('characters').map((characterAttrs) => {
          let character = new CharacterStore(characterAttrs);
          character.resetStates();
          return character;
        });
      })
    ;
    return this.fetch();
  },

  setEditingCharacterIndex(value) {
    if (this.characters[value] === undefined) {
      value = this.defaults().editingCharacterIndex;
    }
    this.set('editingCharacterIndex', value, { validate: true });
    this.trigger(UPDATED_EDITING_CHARACTER_EVENT);
  },

  rotateEditingCharacterIndex(indexDelta) {
    let nextIndex = rotateIndex(this.characters.length, this.editingCharacterIndex, indexDelta);
    this.setEditingCharacterIndex(nextIndex);
  },

  getEditingCharacter() {
    return this.characters[this.editingCharacterIndex] || null;
  }
}, {
  UPDATED_EDITING_CHARACTER_EVENT
});
