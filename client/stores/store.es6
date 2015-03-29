import Backbone from 'backbone';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';


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

  /**
   * 唯一のオブジェクトの場合にデータをストレージへ保存する
   * @return {Promise}
   */
  store() {
    throw new Error('Not implemented');
  },

  /**
   * 唯一のオブジェクトの場合にデータをストレージから復旧する
   * @return {Promise}
   */
  restore() {
    throw new Error('Not implemented');
  }
}, _.assign(
  {},
  SingletonMixin
));
