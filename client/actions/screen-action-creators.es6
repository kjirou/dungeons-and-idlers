import CoreDispatcher from 'client/dispatcher/core';


export default {

  /**
   * Change active page
   * @param {string} pageId
   */
  changePage(pageId) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'changePage',
      pageId
    });
  },

  /**
   * Change editing character
   * @param {number} characterIndex
   */
  changeEditingCharacter(characterIndex) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'changeEditingCharacter',
      characterIndex
    });
  },

  /**
   * Rotate editing character
   * @param {number} indexDelta
   */
  rotateEditingCharacter(indexDelta) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'rotateEditingCharacter',
      indexDelta
    });
  },

  /**
   * Change search query of card page
   * @param {string} searchQuery
   */
  changeCardPageSearchQuery(searchQuery) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'changeCardPageSearchQuery',
      searchQuery
    });
  },

  /**
   * Change sort query of card page
   * @param {string} sortQuery
   */
  changeCardPageSortQuery(sortQuery) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'changeCardPageSortQuery',
      sortQuery
    });
  },

  /**
   * @param {string} equipmentTypeId
   */
  addOrIncreaseEditingCharacterEquipment(equipmentTypeId) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'addOrIncreaseEditingCharacterEquipment',
      equipmentTypeId
    });
  },

  /**
   * @param {string} equipmentTypeId
   */
  decreaseOrRemoveEditingCharacterEquipment(equipmentTypeId) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'decreaseOrRemoveEditingCharacterEquipment',
      equipmentTypeId
    });
  },

  /**
   * @param {string} equipmentTypeId
   * @param {number} relativeIndex
   */
  slideEditingCharacterEquipment(equipmentTypeId, relativeIndex) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'slideEditingCharacterEquipment',
      equipmentTypeId,
      relativeIndex
    });
  },

  /**
   * @param {number} nextEquipmentPatternIndex
   */
  changeEditingCharacterEquipmentPattern(nextEquipmentPatternIndex) {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'changeEditingCharacterEquipmentPattern',
      nextEquipmentPatternIndex
    });
  },

  storeCharacters() {
    CoreDispatcher.getInstance().handleViewAction({
      type: 'storeCharacters'
    });
  }
};
