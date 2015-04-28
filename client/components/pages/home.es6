import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';
import PageComponentMixin from 'client/lib/mixins/page-component';
import PlayerStore from 'client/stores/player';


export default React.createClass({
  displayName: 'HomePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _getStateFromStores() {
    let playerStore = PlayerStore.getInstance();
    return {
      fameLevel: playerStore.getFameLevel()
    };
  },

  getInitialState() {
    return this._getStateFromStores();
  },

  componentWillMount() {
    let playerStore = PlayerStore.getInstance();

    playerStore.on(PlayerStore.UPDATED_STATE_EVENT, () => {
      this.setState(this._getStateFromStores());
    });
  },

  createOnMouseDownPageChangeButton(pageId) {
    return () => ScreenActionCreators.changePage(pageId);
  },

  render() {
    return compileJsxTemplate('pages/home', {
      className: createPageComponentClassName('home'),
      style: this.createDefaultStyles(),
      state: this.state,
      createOnMouseDownPageChangeButton: this.createOnMouseDownPageChangeButton
    });
  }
});
