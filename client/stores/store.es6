import Backbone from 'backbone';
import {Promise} from 'bluebird';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';
import Storage from 'client/lib/storage';


export default Backbone.Model.extend({

  propGetter(getterName, propName=null) {
    Object.defineProperty(this, getterName, {
      get: function() {
        return _.result(this, propName || '_' + getterName);
      }
    });
  },

  attrGetter(getterName, attrName=null) {
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
   * ストレージの情報をattributesへ反映する
   * @return {Promise}
   */
  fetch() {
    let storage = new Storage();
    return storage.fetch(this.storageName).then((data) => {
      data = data || {};
      Object.keys(data).forEach((k) => {
        this.set(k, data[k], { validate: true });
      });
    });
  },

  /**
   * インスタンスの状態をストレージから復旧する
   * @return {Promise}
   */
  restore() {
    throw new Error('Not implemented');
  }
}, _.assign(
  {},
  SingletonMixin
));
