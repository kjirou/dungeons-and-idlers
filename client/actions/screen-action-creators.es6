import CoreDispatcher from 'client/dispatcher/core';
let coreDispatcher = CoreDispatcher.getInstance();


export default {

  /**
   * Change active page
   */
  changePage: function changePage(pageId) {
    coreDispatcher.handleViewAction({
      type: 'change_page',
      pageId: pageId
    });
  }
};
