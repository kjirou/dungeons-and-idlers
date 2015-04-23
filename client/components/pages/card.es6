import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';
import CardsStore from 'client/stores/cards';


export default React.createClass({
  displayName: 'CardPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    return compileJsxTemplate('pages/card', {
      className: createPageComponentClassName('card'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      CardComponent,
      cardsStore: CardsStore.getInstance()
    });
  }
});
