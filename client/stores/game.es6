import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import CharacterStore from 'client/stores/creatures/character';
import Store from 'client/stores/store';


export default Store.extend({

  initialize() {
    this._coreDispatcher = CoreDispatcher.getInstance();
  }
});
