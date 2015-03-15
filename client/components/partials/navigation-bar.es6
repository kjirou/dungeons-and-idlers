import React from 'react';

import {NAVIGATION_BAR_HEIGHT} from 'client/constants';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import ScreenStore from 'client/stores/screen';


export default React.createClass({
  displayName: 'NavigationBarComponent',
  mixins: [ComponentMixin],

  //propTypes: {
  //  width: React.PropTypes.number.isRequired,
  //  height: React.PropTypes.number.isRequired
  //},

  getInitialState: function() {
    let screenStore = ScreenStore.getInstance();
    return {
      pageId: screenStore.pageId
    };
  },

  componentWillMount: function() {
    let screenStore = ScreenStore.getInstance();
    //this.pipeStoreAttributeToState(screenStore, 'pageId');
  },

  render: function render() {
    return (
      <nav className={createComponentClassName('navigation_bar')} >
        <ul>
          <li><span>[ Home ]</span></li>
          <li><span>[ Party ]</span></li>
          <li><span>[ Card ]</span></li>
          <li><span>[ Config ]</span></li>
          <li><span>[ Help ]</span></li>
        </ul>
      </nav>
    );
  }
});
