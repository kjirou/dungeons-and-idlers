import React from 'react';

import ViewMixin from 'client/mixins/view';
import { createClassName } from 'client/lib/view';
import WelcomePageView from 'client/views/pages/welcome'


const PAGE_COMPONENTS = {
  welcome: WelcomePageView
};


export default React.createClass({
  displayName: 'ScreenView',
  mixins: [ViewMixin],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      pageId: 'welcome'
    };
  },

  render: function render() {
    let activePageComponent = PAGE_COMPONENTS[this.state.pageId];
    if (!activePageComponent) {
      throw new Error(`${this.pageId} is invalid page-id`);
    }

    return React.createElement('div',
      {
        className: createClassName('screen'),
        style: {
          width: this.props.width,
          height: this.props.height
        },
      },
      React.createElement(WelcomePageView, {
        key: 'welcome-page',
        isActive: activePageComponent === WelcomePageView
      })
    );
  }
});
