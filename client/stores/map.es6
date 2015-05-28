import _ from 'lodash';
import rpgparameter from 'rpgparameter';
let aggregators = rpgparameter.aggregators;

import {slideIndex, within} from 'client/lib/core';
import {equipments} from 'client/lib/equipments';
import {jobs} from 'client/lib/jobs';
import CardifyMixin from 'client/lib/mixins/cardify';
import IconizeMixin from 'client/lib/mixins/iconize';
import NamingMixin from 'client/lib/mixins/naming';
import ParametersMixin from 'client/lib/mixins/parameters';
import Store from 'client/stores/store';


export default Store.extend({

  defaults() {
    return {
      cells: []
    };
  },

  initialize() {
    Store.prototype.initialize.apply(this);

    this._cells = [];

    this.propGetter('cells');
  }
});
