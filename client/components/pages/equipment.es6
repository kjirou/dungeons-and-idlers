import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import ScreenActionCreators from 'client/actions/screen-action-creators';
import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';
import CharactersStore from 'client/stores/characters';


export default React.createClass({
  displayName: 'EquipmentPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  getInitialState() {
    let charactersStore = CharactersStore.getInstance();
    return {
      editingCharacterIndex: charactersStore.editingCharacterIndex
    };
  },

  componentWillMount() {
    let charactersStore = CharactersStore.getInstance();
    this.pipeStoreAttributeToState(charactersStore, 'editingCharacterIndex');
  },

  _onMouseDownCharacterName() {
    ScreenActionCreators.changePage('character');
  },

  _onMouseDownNextCharacter() {
    ScreenActionCreators.rotateEditingCharacter(1);
    ScreenActionCreators.changePage('equipment');
  },

  _onMouseDownPrevCharacter() {
    ScreenActionCreators.rotateEditingCharacter(-1);
    ScreenActionCreators.changePage('equipment');
  },

  render: function render() {
    let charactersStore = CharactersStore.getInstance();
    let selectedCharacterStore = charactersStore.getEditingCharacter();

    let selectedCharacterElement = null;
    if (selectedCharacterStore) {
      selectedCharacterElement = <CardComponent {...{
        top: 8,
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
      selectedCharacterElement,
      onMouseDownCharacterName: this._onMouseDownCharacterName,
      onMouseDownNextCharacter: this._onMouseDownNextCharacter,
      onMouseDownPrevCharacter: this._onMouseDownPrevCharacter
    });
  }
});
