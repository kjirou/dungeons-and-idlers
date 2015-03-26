import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'PartyPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return compileJsxTemplate('pages/party', {
      className: createPageComponentClassName('party'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      }
    });
  }
});
