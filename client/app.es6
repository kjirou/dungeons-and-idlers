import {Promise} from 'bluebird';
import _ from 'lodash';
import React from 'react';

import ScreenComponent from 'client/components/screen';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'client/constants';
import CoreDispatcher from 'client/dispatcher/core';
import CardsStore from 'client/stores/cards';
import CharactersStore from 'client/stores/characters';
import ScreenStore from 'client/stores/screen';


export default class App {

  /**
   * Store群の情報を削除する
   */
  static clearStores() {
    [
      CardsStore,
      CharactersStore,
      ScreenStore
    ].forEach((storeClass) => {
      storeClass.clearInstance();
    });
  }

  /**
   * Store群を初期化する、依存関係明示のために一箇所で行う
   * @return {Object}
   */
  static initializeStores() {
    let cardsStore = CardsStore.getInstance();
    let charactersStore = CharactersStore.getInstance();
    let screenStore = ScreenStore.getInstance({}, { charactersStore });

    return {
      cardsStore,
      charactersStore,
      screenStore
    };
  }


  constructor() {
    CoreDispatcher.clearInstance();
    this._dispatcher = CoreDispatcher.getInstance();

    App.clearStores();
    this._stores = App.initializeStores();

    this._rootElement = React.createElement(ScreenComponent, {
      key: 'screen',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });
  }

  /**
   * @param {HTMLElement} container
   */
  renderTo(container) {
    React.render(this._rootElement, container);
  }

  /**
   * 外部データを取得して状態を復元する
   * @return {Promise}
   */
  restoreStorages() {
    return Promise.all([
      this._stores.cardsStore.restore(),
      this._stores.charactersStore.restore()
    ]);
  }

  /**
   * アプリケーションを開始する、各種タイマーも起動される
   * @return {Promise}
   */
  start() {
    return this.restoreStorages();
  }
}
