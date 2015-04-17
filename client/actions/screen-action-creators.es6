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
  },

  /**
   * Rotate editing character
   * @param {number} indexDelta
   */
  rotateEditingCharacter(indexDelta) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'rotate_editing_character',
      indexDelta
    });
  }
};
