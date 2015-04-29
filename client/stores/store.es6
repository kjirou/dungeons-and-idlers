import Backbone from 'backbone';
import {Promise} from 'bluebird';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';
import Storage from 'client/lib/storage';


const CHANGE_EVENT = 'CHANGE';

let Store = Backbone.Model.extend({

  initialize() {
    this._deps = {};
    this.dispatchTokens = [];
  },

  emitChange() {
    this.trigger(CHANGE_EVENT);
  },

  /**
   * プロパティのgetterを定義する
   */
  propGetter(getterName, propName = null) {
    Object.defineProperty(this, getterName, {
      get: function() {
        return _.result(this, propName || '_' + getterName);
      }
    });
  },

  /**
   * attributeのgetterを定義する
   */
  attrGetter(getterName, attrName = null) {
    Object.defineProperty(this, getterName, {
      get: function() {
        return this.get(attrName || getterName);
      }
    });
  },

  storageName: null,

  /**
   * attributesをストレージへ保存する
   * @return {Promise}
   */
  save() {
    let storage = new Storage();
    return storage.save(this.storageName, this.attributes);
  },

  /**
   * ストレージをattributesへ反映する
   * @return {Promise}
   */
  fetch() {
    let storage = new Storage();
    return storage.fetch(this.storageName).then((data) => {
      data = data || {};
      Object.keys(data).forEach((k) => {
        this.set(k, data[k]);  // validate はしない、ここで落とすと修正できなくなるから
      });
    });
  },

  /**
   * インスタンスの状態を正としてattributesへ反映し、両者を同期する
   */
  syncStatesToAttributes() {
  },

  /**
   * インスタンスの状態をストレージへ保存する
   * @return {Promise}
   */
  store() {
    this.syncStatesToAttributes();
    return this.save();
  },

  /**
   * attributesを正としてインスタンスの状態へ反映し、両者を同期する
   */
  syncAttributesToStates() {
  },

  /**
   * インスタンスの状態をストレージから復旧する
   * @return {Promise}
   */
  restore() {
    return this
      .fetch()
      .then(() => {
        this.syncAttributesToStates();
        this.emitChange();
      })
    ;
  }
}, _.assign(
  {
    CHANGE_EVENT
  },
  SingletonMixin
));


export default Store;
