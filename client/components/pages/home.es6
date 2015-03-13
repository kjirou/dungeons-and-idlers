import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'HomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return compileJsxTemplate('pages/home', {
      className: createPageComponentClassName('home'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      }
    });
  }
});
