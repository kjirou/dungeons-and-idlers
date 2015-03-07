import CoreDispatcher from 'client/dispatcher/core';


export default {

  /**
   * Change active page
   */
  changePage: function changePage(pageId) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'change_page',
      pageId: pageId
    });
  }
};
