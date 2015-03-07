import React from 'react';

import HomePageComponent from 'client/components/pages/home'
import WelcomePageComponent from 'client/components/pages/welcome'
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import ScreenStore from 'client/stores/screen';


const PAGE_COMPONENTS = {
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

  getInitialState: function() {
    let screenStore = ScreenStore.getInstance();
    return {
      pageId: screenStore.pageId
    };
  },

  componentWillMount: function() {
    let screenStore = ScreenStore.getInstance();
    this.pipeStoreAttributeToState(screenStore, 'pageId');
  },

  render: function render() {
    let activePageComponent = PAGE_COMPONENTS[this.state.pageId];
    if (!activePageComponent) {
      throw new Error(`${this.state.pageId} is invalid page-id`);
    }

    return React.createElement('div',
      {
        className: createComponentClassName('screen'),
        style: {
          width: this.props.width,
          height: this.props.height
        },
      },
      React.createElement(WelcomePageComponent, {
        key: 'welcome-page',
        isActive: activePageComponent === WelcomePageComponent
      }),
      React.createElement(HomePageComponent, {
        key: 'home-page',
        isActive: activePageComponent === HomePageComponent
      })
    );
  }
});
