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
  },

  /**
   * Change search query of card page
   * @param {string} searchQuery
   */
  changeCardPageSearchQuery(searchQuery) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'change_card_page_search_query',
      searchQuery
    });
  },

  /**
   * Change sort query of card page
   * @param {string} sortQuery
   */
  changeCardPageSortQuery(sortQuery) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'change_card_page_sort_query',
      sortQuery
    });
  }
};
