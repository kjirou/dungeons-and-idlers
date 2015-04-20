import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';


export default React.createClass({
  displayName: 'HomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  createOnMouseDownPageChangeButton(pageId) {
    return function() {
      ScreenActionCreators.changePage(pageId);
    };
  },

  render: function render() {
    return compileJsxTemplate('pages/home', {
      className: createPageComponentClassName('home'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      createOnMouseDownPageChangeButton: this.createOnMouseDownPageChangeButton
    });
  }
});
