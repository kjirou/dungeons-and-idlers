import React from 'react';

import CardPageComponent from 'client/components/pages/card';
import CharacterPageComponent from 'client/components/pages/character';
import DungeonPageComponent from 'client/components/pages/dungeon';
import EquipmentPageComponent from 'client/components/pages/equipment';
import GamePageComponent from 'client/components/pages/game';
import HomePageComponent from 'client/components/pages/home';
import WelcomePageComponent from 'client/components/pages/welcome';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import ScreenStore from 'client/stores/screen';


const PAGE_COMPONENTS = {
  card: CardPageComponent,
  character: CharacterPageComponent,
  dungeon: DungeonPageComponent,
  equipment: EquipmentPageComponent,
  game: GamePageComponent,
  home: HomePageComponent,
  welcome: WelcomePageComponent
};


export default React.createClass({
  displayName: 'ScreenComponent',
  mixins: [ComponentMixin],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  _getStateFromStores() {
    let screenStore = ScreenStore.getInstance();
    return {
      pageId: screenStore.pageId
    };
  },

  getInitialState() {
    return this._getStateFromStores();
  },

  componentWillMount() {
    let screenStore = ScreenStore.getInstance();

    screenStore.on(ScreenStore.CHANGE_EVENT, () => {
      this.setState(this._getStateFromStores());
    });
  },

  render() {
    let activePageComponent = PAGE_COMPONENTS[this.state.pageId];
    if (!activePageComponent) {
      throw new Error(`${this.state.pageId} is invalid page-id`);
    }

    let pageElements = Object.keys(PAGE_COMPONENTS).map((pageId) => {
      let pageComponent = PAGE_COMPONENTS[pageId];
      return React.createElement(pageComponent, {
        key: pageId + '-page',
        isActive: activePageComponent === pageComponent
      });
    });

    return React.createElement('div',
      {
        className: createComponentClassName('screen'),
        style: {
          width: this.props.width,
          height: this.props.height
        },
      },
      ...pageElements
    );
  }
});
