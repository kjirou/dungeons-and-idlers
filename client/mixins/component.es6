import _ from 'lodash';


export default {

  /**
   * Storeのattributeの変更をComponentのstateへ反映する監視をする
   * @param {Store} store
   * @param {string} attrName storeの属性値
   */
  pipeStoreAttributeToState: function pipeStoreAttributeToState(store, attrName) {
    let self = this;
    store.on('change:' + attrName, function() {
      self.setState(
        _.zipObject([attrName], [this.get(attrName)])
      );
    });
  }
}
