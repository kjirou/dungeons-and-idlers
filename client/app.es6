import {Promise} from 'bluebird';
import _ from 'lodash';
import React from 'react';

import ScreenComponent from 'client/components/screen';
import ScreenStore from 'client/stores/screen';


export default class App {

  static getScreenWidth() { return 800; }
  static getScreenHeight() { return 480; }
  static getScreenSize() { return [this.getScreenWidth(), this.getScreenHeight()]; }

  /**
   * Store群の情報を削除する
   */
  static clearStores() {
    [
      ScreenStore
    ].forEach((storeClass) => {
      storeClass.clearInstance();
    });
  }

  /**
   * Store群を初期化する、依存関係明示のために一箇所で行う
   * @return {Object}
   */
  static resetStores() {
    this.clearStores();

    let screenStore = ScreenStore.getInstance();

    return {
      screenStore
    };
  }


  constructor() {
    this._stores = App.resetStores();

    this._rootElement = React.createElement(ScreenComponent, {
      key: 'screen',
      width: App.getScreenWidth(),
      height: App.getScreenHeight()
    });
  }

  /**
   * @param {HTMLElement} container
   */
  renderTo(container) {
    React.render(this._rootElement, container);
  }

  /**
   * 外部データを取得して展開する
   * @return {Promise}
   */
  loadStorages() {
    return Promise.resolve();
  }

  /**
   * アプリケーションを開始する、各種タイマーも起動される
   * @return {Promise}
   */
  start() {
    return this.loadStorages();
  }
}
