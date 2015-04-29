import CoreDispatcher from 'client/dispatcher/core';
import Store from 'client/stores/store';


let ScreenStore = Store.extend({

  defaults() {
    return {
      pageId: 'welcome'
    };
  },

  initialize(attrs, { charactersStore }) {
    Store.prototype.initialize.apply(this);

    this.attrGetter('pageId');

    let coreDispatcher = CoreDispatcher.getInstance();
    let dispatchToken0 = coreDispatcher.register(({action}) => {
      coreDispatcher.waitFor([
        ...charactersStore.dispatchTokens
      ]);

      switch (action.type) {
        case 'changePage':
          this.set('pageId', action.pageId, { validate: true });
          this.emitChange();
          break;
      }
    });
    this.dispatchTokens = [dispatchToken0];
  }
});


export default ScreenStore;
