import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'VisitorPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  //_onMouseDownStartGame() {
  //  ScreenActionCreators.changePage('game');
  //},

  render() {
    return compileJsxTemplate('pages/visitor', {
      className: createPageComponentClassName('visitor'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      }
    });
  }
});
