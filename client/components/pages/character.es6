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
  displayName: 'CharacterPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  /**
   * @param {number} characterIndex Index of `charactersStore.characters`
   */
  _onMouseDownCharacter(characterIndex) {
    ScreenActionCreators.changeEditingCharacter(characterIndex);
    ScreenActionCreators.changePage('equipment');
  },

  render: function render() {
    let characterElements;

    return compileJsxTemplate('pages/character', {
      className: createPageComponentClassName('character'),
      style: this.createDefaultStyles(),
      navigationBar: {
        NavigationBarComponent
      },
      CardComponent,
      charactersStore: CharactersStore.getInstance(),
      onMouseDownCharacter: this._onMouseDownCharacter
    });
  }
});
