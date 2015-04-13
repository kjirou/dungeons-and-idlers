import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';
import CharactersStore from 'client/stores/characters';


export default React.createClass({
  displayName: 'EquipmentPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render: function render() {
    let charactersStore = CharactersStore.getInstance();
    let selectedCharacterStore = charactersStore.characters[0] || null;  // TMP

    let selectedCharacterElement = null;
    if (selectedCharacterStore) {
      selectedCharacterElement = <CardComponent {...{
        top: 16,
        left: 32,
        isFace: true,
        cardBodyType: 'creature',
        cardBodyProps: selectedCharacterStore.toCardBodyComponentProps()
      }}/>;
    }

    return compileJsxTemplate('pages/equipment', {
      className: createPageComponentClassName('equipment'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      CardComponent,
      charactersStore,
      selectedCharacterStore,
      selectedCharacterName: (selectedCharacterStore) ? selectedCharacterStore.getName() : '',
      selectedCharacterElement
    });
  }
});
