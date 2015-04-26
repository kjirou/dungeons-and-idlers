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

  _getStateFromStores() {
    let charactersStore = CharactersStore.getInstance();
    let editingCharacter = charactersStore.getEditingCharacter();
    return {
      editingCharacter
    };
  },

  getInitialState() {
    return this._getStateFromStores();
  },

  componentWillMount() {
    let charactersStore = CharactersStore.getInstance();

    charactersStore.on(CharactersStore.UPDATED_EDITING_CHARACTER_EVENT, () => {
      this.setState(this._getStateFromStores());
    });

    charactersStore.on(CharactersStore.UPDATED_EDITING_CHARACTER_STATE_EVENT, () => {
      this.setState(this._getStateFromStores());
    });
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

  createOnMouseDownChangeEquipmentPattern(nextEquipmentPatternIndex) {
    return () => {
      ScreenActionCreators.changeEditingCharacterEquipmentPattern(nextEquipmentPatternIndex);
      ScreenActionCreators.storeCharacters();
    };
  },

  createOnMouseDownUpdateEquipment(mode, equipmentTypeId) {
    let updateEvent = null;
    switch (mode) {
      case 'add':
        updateEvent = () => {
          ScreenActionCreators.addOrIncreaseEditingCharacterEquipment(equipmentTypeId);
        };
        break;
      case 'increase':
        updateEvent = () => {
          ScreenActionCreators.addOrIncreaseEditingCharacterEquipment(equipmentTypeId);
        };
        break;
      case 'decrease':
        updateEvent = () => {
          ScreenActionCreators.decreaseOrRemoveEditingCharacterEquipment(equipmentTypeId);
        };
        break;
      case 'up':
        updateEvent = () => {
          ScreenActionCreators.slideEditingCharacterEquipment(equipmentTypeId, -1);
        };
        break;
      case 'down':
        updateEvent = () => {
          ScreenActionCreators.slideEditingCharacterEquipment(equipmentTypeId, 1);
        };
        break;
    }
    return () => {
      updateEvent();
      ScreenActionCreators.storeCharacters();
    };
  },

  render: function render() {
    return compileJsxTemplate('pages/equipment', {
      className: createPageComponentClassName('equipment'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      CardComponent,
      editingCharacter: this.state.editingCharacter,
      onMouseDownCharacterName: this._onMouseDownCharacterName,
      onMouseDownNextCharacter: this._onMouseDownNextCharacter,
      onMouseDownPrevCharacter: this._onMouseDownPrevCharacter,
      createOnMouseDownChangeEquipmentPattern: this.createOnMouseDownChangeEquipmentPattern,
      createOnMouseDownUpdateEquipment: this.createOnMouseDownUpdateEquipment
    });
  }
});
