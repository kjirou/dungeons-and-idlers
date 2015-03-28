import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'WelcomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _onMouseDown: function _onMouseDown() {
    ScreenActionCreators.changePage('home');
  },

  render: function render() {
    return compileJsxTemplate('pages/welcome', {
      className: createPageComponentClassName('welcome'),
      style: this.createDefaultStyles(),
      onMouseDown: this._onMouseDown
    });
  }
});
