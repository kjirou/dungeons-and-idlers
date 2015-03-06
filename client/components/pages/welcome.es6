import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import {createPageComponentClassName} from 'client/lib/view';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'WelcomePageComponent',
  mixins: [PageComponentMixin],

  //onMouseDownChangePageButton: ->
  //  @props.coreActionCreator.changePage 'GamePageComponent'

  render: function render() {
    return React.createElement(
      'div',
      {
        className: createPageComponentClassName('welcome'),
      },
      DOM.h2(null, 'Welcome Page')
      //DOM.div {
      //  onMouseDown: @onMouseDownChangePageButton
      //}, '[ Start game ]'
    );
  }
});
