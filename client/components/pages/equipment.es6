import _ from 'lodash';
import React from 'react';
var {DOM} = React;

import ScreenActionCreators from 'client/actions/screen-action-creators';
import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';
import CardsStore from 'client/stores/cards';
import CharactersStore from 'client/stores/characters';


export default React.createClass({
  displayName: 'EquipmentPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _getStateFromStores() {
    let cardsStore = CardsStore.getInstance();
    let charactersStore = CharactersStore.getInstance();

    let cards = {};
    let cardChoices = {};
    ['sub_action', 'feat', 'deck'].forEach((category) => {
      let categoryCards = cardsStore.findAggregatedCards({ conditions: { equipment: { category } } });
      let choices = [{ value: '', label: '- 選択 -' }].concat(categoryCards.map((v) => {
        return { value: v.equipment.typeId, label: v.equipment.getName() };
      }));
      cards[category] = categoryCards;
      cardChoices[category] = choices;
    });

    return {
      editingCharacter: charactersStore.editingCharacter,
      cards,
      cardChoices
    };
  },

  getInitialState() {
    return _.assign({
      selectedNewSubAction: '',
      selectedNewFeat: '',
      selectedNewDeck: ''
    }, this._getStateFromStores());
  },

  componentWillMount() {
    let charactersStore = CharactersStore.getInstance();

    // TODO: カード取得イベントの監視

    charactersStore.on(CharactersStore.CHANGE_EVENT, () => {
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

  createOnMouseDownAddNewEquipment(category) {
    let stateKey = {
      sub_action: 'selectedNewSubAction',
      feat: 'selectedNewFeat',
      deck: 'selectedNewDeck'
    }[category];
    return () => {
      let equipmentTypeId = this.state[stateKey];
      if (!equipmentTypeId) {
        return;
      }
      ScreenActionCreators.addOrIncreaseEditingCharacterEquipment(equipmentTypeId);
      ScreenActionCreators.storeCharacters();
    };
  },

  createOnMouseDownUpdateEquipment(mode, equipmentTypeId) {
    let updateEvent = null;
    switch (mode) {
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

  createOnChangeEquipmentSelectField(category) {
    return (evt) => {
      this.setState({
        [
          {
            sub_action: 'selectedNewSubAction',
            feat: 'selectedNewFeat',
            deck: 'selectedNewDeck'
          }[category]
        ]: evt.target.value
      });
    };
  },

  render() {
    return compileJsxTemplate('pages/equipment', {
      className: createPageComponentClassName('equipment'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      CardComponent,
      state: this.state,
      onMouseDownCharacterName: this._onMouseDownCharacterName,
      onMouseDownNextCharacter: this._onMouseDownNextCharacter,
      onMouseDownPrevCharacter: this._onMouseDownPrevCharacter,
      createOnMouseDownAddNewEquipment: this.createOnMouseDownAddNewEquipment,
      createOnMouseDownChangeEquipmentPattern: this.createOnMouseDownChangeEquipmentPattern,
      createOnMouseDownUpdateEquipment: this.createOnMouseDownUpdateEquipment,
      createOnChangeEquipmentSelectField: this.createOnChangeEquipmentSelectField
    });
  }
});
