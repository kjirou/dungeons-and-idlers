import CoreDispatcher from 'client/dispatcher/core';
import Store from 'client/stores/store';


export default Store.extend({

  defaults: function() {
    return {
      pageId: 'welcome',
      editingCharacterIndex: 0
    };
  },

  initialize: function(attrs, { charactersStore }) {
    let self = this;
    let coreDispatcher = CoreDispatcher.getInstance();

    this.attrGetter('pageId');

    let dispatchToken0 = coreDispatcher.register(function({action}) {
      coreDispatcher.waitFor([
        ...charactersStore.dispatchTokens
      ]);

      switch (action.type) {
        case 'changePage':
          self.set('pageId', action.pageId, { validate: true });
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0];
  }
});
