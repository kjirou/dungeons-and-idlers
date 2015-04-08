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
        jobTypeId: job.jobTypeId
      };
    });

    return {
      characters: characters
    };
  },

  initialize() {
    this._coreDispatcher = CoreDispatcher.getInstance();

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
        this._characters = this.get('characters').map((characterData) => {
          return new CharacterStore(characterData);
        });
      })
    ;
    return this.fetch();
  }
});
