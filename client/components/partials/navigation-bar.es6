import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import {NAVIGATION_BAR_HEIGHT} from 'client/constants';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';


export default React.createClass({
  displayName: 'NavigationBarComponent',
  mixins: [ComponentMixin],

  _createOnMouseDown(nextPageId) {
    return () => {
      ScreenActionCreators.changePage(nextPageId);
    };
  },

  render() {
    let pageIds = [
      { id: 'home', label: 'Home' },
      { id: 'character', label: 'Character' },
      { id: 'card', label: 'Card' },
      { id: 'dungeon', label: 'Dungeon' },
      { id: 'config', label: 'Config' },
      { id: 'help', label: 'Help' },
      { id: 'equipment', label: 'Debug' }
    ];

    return (
      <nav className={createComponentClassName('navigation_bar')} >
        <ul>
        {
          pageIds.map(({id, label}) => {
            return <li key={id}><span onMouseDown={this._createOnMouseDown(id)} >{label}</span></li>;
          })
        }
        </ul>
      </nav>
    );
  }
});
