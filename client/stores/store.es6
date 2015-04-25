import Backbone from 'backbone';
import {Promise} from 'bluebird';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';
import Storage from 'client/lib/storage';


const UPDATED_STATE_EVENT = 'UPDATED_STATE_EVENT';

let Store = Backbone.Model.extend({

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

  set(...args) {
    Backbone.Model.prototype.set.apply(this, args);
    this.trigger(this.constructor.UPDATED_STATE_EVENT);
  },

  /**
   * インスタンスの状態を返す
   *
   * TODO:
   * [deprecation]
   * "状態" はインスタンスのプロパティの値などを示すので不適切
   * そもそもの意図としては「保存用のattributesを返す」なので別名にする
   */
  toStates() {
    return this.attributes;
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
      .then(() => { this.syncAttributesToStates(); })
    ;
  }
}, _.assign(
  {
    UPDATED_STATE_EVENT
  },
  SingletonMixin
));


export default Store;
