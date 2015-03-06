import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import {createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'HomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return React.createElement(
      'div',
      {
        className: createPageComponentClassName('home'),
        style: this.createDefaultStyles()
      },
      DOM.h2(null, 'Home Page')
    );
  }
});
