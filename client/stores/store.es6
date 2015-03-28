import Backbone from 'backbone';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';


export default Backbone.Model.extend({

  propGetter: function propGetter(getterName, propName=null) {
    Object.defineProperty(this, getterName, {
      get: function() {
        return _.result(this, propName || '_' + getterName);
      }
    });
  },

  attrGetter: function attrGetter(getterName, attrName=null) {
    Object.defineProperty(this, getterName, {
      get: function() {
        return this.get(attrName || getterName);
      }
    });
  }
}, _.assign(
  {},
  SingletonMixin
));
