import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import CardComponent from 'client/components/partials/card';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'DungeonPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _getStateFromStores() {
    return {
    };
  },

  getInitialState() {
    return this._getStateFromStores();
  },

  componentWillMount() {
  },

  render() {
    return compileJsxTemplate('pages/dungeon', {
      className: createPageComponentClassName('dungeon'),
      style: this.createDefaultStyles(),
      state: this.state
    });
  }
});
