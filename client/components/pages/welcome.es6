import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import ScreenActionCreators from 'client/actions/screen-action-creators';
import {createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'WelcomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return React.createElement(
      'div',
      {
        className: createPageComponentClassName('welcome'),
        style: this.createDefaultStyles(),
        onMouseDown: this._onMouseDown
      },
      DOM.h2(null, 'Welcome Page')
    );
  },

  _onMouseDown: function _onMouseDown() {
    ScreenActionCreators.changePage('home');
  }
});
