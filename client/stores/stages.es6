import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {stageFolders, stages} from 'client/lib/stages';
import Store from 'client/stores/store';


let StagesStore = Store.extend({

  storageName: 'store:stages',

  defaults() {
    return {
      stages: []
    };
  },

  initialize() {
    Store.prototype.initialize.apply(this);

    this._stages = [];

    this.syncAttributesToStates();
  }
});


export default StagesStore;
