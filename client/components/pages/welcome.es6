import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import {createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'WelcomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _onMouseDown: function _onMouseDown() {
    ScreenActionCreators.changePage('home');
  },

  render: function render() {
    return (
      <div
        className={createPageComponentClassName('welcome')}
        style={this.createDefaultStyles()}
        onMouseDown={this._onMouseDown}
      >
        <h2>Welcome Page</h2>
      </div>
    );
  }
});
