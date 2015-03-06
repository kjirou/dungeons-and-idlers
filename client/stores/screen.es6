import CoreDispatcher from 'client/dispatcher/core';
let coreDispatcher = CoreDispatcher.getInstance();
import Store from 'client/stores/store';


export default Store.extend({

  defaults: function() {
    return {
      pageId: 'welcome'
    };
  },

  initialize: function() {
    let self = this;

    this.attrGetter('pageId');

    this.dispatchToken = coreDispatcher.register(function({action}) {
      switch (action.type) {
        case 'change_page':
          self.set('pageId', action.pageId);
          break;
      }
    });
  }
});
