import CoreDispatcher from 'client/dispatcher/core';


export default {

  /**
   * Change active page
   * @param {string} pageId
   */
  changePage(pageId) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'change_page',
      pageId
    });
  },

  /**
   * Change editing character
   * @param {number} characterIndex
   */
  changeEditingCharacter(characterIndex) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'change_editing_character',
      characterIndex
    });
  }
};
