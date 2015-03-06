import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import {createPageClassName} from 'client/lib/view';
import PageViewMixin from 'client/mixins/page-view';


export default React.createClass({
  displayName: 'WelcomePageView',
  mixins: [PageViewMixin],

  //onMouseDownChangePageButton: ->
  //  @props.coreActionCreator.changePage 'GamePageView'

  render: function render() {
    return React.createElement(
      'div',
      {
        className: createPageClassName('welcome'),
      },
      DOM.h2(null, 'Welcome Page')
      //DOM.div {
      //  onMouseDown: @onMouseDownChangePageButton
      //}, '[ Start game ]'
    );
  }
});
