import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'GamePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render() {
    return compileJsxTemplate('pages/game', {
      className: createPageComponentClassName('game'),
      style: this.createDefaultStyles()
    });
  }
});
