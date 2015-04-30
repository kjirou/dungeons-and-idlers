import _ from 'lodash';
import React from 'react';

import ScreenActionCreators from 'client/actions/screen-action-creators';
import ComponentMixin from 'client/lib/mixins/component';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import PageComponentMixin from 'client/lib/mixins/page-component';
import CardsStore from 'client/stores/cards';


export default React.createClass({
  displayName: 'CardPageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  _getStateFromStores() {
    let cardsStore = CardsStore.getInstance();
    return {
      cards: cardsStore.findAggregatedCardsForCardPage(),
      selectedSearchValue: cardsStore.selectedCardPageSearchQuery,
      selectedSortValue: cardsStore.selectedCardPageSortQuery,
      allCardCount: cardsStore.aggregatedCounts.all,
      subActionCardCount: cardsStore.aggregatedCounts.sub_action,
      featCardCount: cardsStore.aggregatedCounts.feat,
      deckCardCount: cardsStore.aggregatedCounts.deck
    };
  },

  getInitialState() {
    return this._getStateFromStores();
  },

  componentWillMount() {
    let cardsStore = CardsStore.getInstance();

    cardsStore.on(CardsStore.UPDATED_CARD_PAGE_QUERY_EVENT, () => {
      this.setState(this._getStateFromStores());
    });

    cardsStore.on(CardsStore.UPDATED_AGGREGATED_CARDS_EVENT, () => {
      this.setState(this._getStateFromStores());
    });
  },

  onChangeSearchSelect(evt) {
    ScreenActionCreators.changeCardPageSearchQuery(evt.target.value);
  },

  onChangeSortSelect(evt) {
    ScreenActionCreators.changeCardPageSortQuery(evt.target.value);
  },

  render() {
    let cardsStore = CardsStore.getInstance();

    let searchSelectElement = <select
      value={this.state.selectedSearchValue}
      onChange={this.onChangeSearchSelect}
    >
      <option value='all'>{'全てのカード(' + this.state.allCardCount + ')'}</option>
      <option value='sub_action'>{'サブアクション(' + this.state.subActionCardCount + ')'}</option>
      <option value='feat'>{'フィート(' + this.state.featCardCount + ')'}</option>
      <option value='deck'>{'デッキ(' + this.state.deckCardCount + ')'}</option>
    </select>;

    let sortSelectElement = <select
      value={this.state.selectedSortValue}
      onChange={this.onChangeSortSelect}
    >
      <option value='default'>初期順</option>
      <option value='recent'>新着順</option>
    </select>;

    return compileJsxTemplate('pages/card', {
      className: createPageComponentClassName('card'),
      style: this.createDefaultStyles(),
      cards: this.state.cards,
      searchSelectElement,
      sortSelectElement
    });
  }
});
