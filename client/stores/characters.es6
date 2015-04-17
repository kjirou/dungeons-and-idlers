import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {jobs, playableJobList} from 'client/lib/jobs';
import CharacterStore from 'client/stores/creatures/character';
import Store from 'client/stores/store';


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
          self.set('editingCharacterIndex', action.characterIndex, { validate: true });
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0];

    this._characters = [];

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

  getEditingCharacter() {
    return this.characters[this.get('editingCharacterIndex')] || null;
  }
});
