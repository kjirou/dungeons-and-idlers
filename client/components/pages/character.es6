import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'CharacterPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return compileJsxTemplate('pages/character', {
      className: createPageComponentClassName('character'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      }
    });
  }
});
