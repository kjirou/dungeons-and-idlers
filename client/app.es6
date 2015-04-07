import {Promise} from 'bluebird';
import _ from 'lodash';
import React from 'react';

import ScreenComponent from 'client/components/screen';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'client/constants';
import CoreDispatcher from 'client/dispatcher/core';
import ScreenStore from 'client/stores/screen';


export default class App {

  static isNode() {
    return typeof exports === 'object' && typeof module === 'object';
  }

  /**
   * 実行環境を示すキーを明示的に指定する
   */
  static setEnv(env) {
    this._env = env;
  }

  /**
   * 実行環境を示すキーを返す
   */
  static getEnv() {
    return this._env || (this.isNode() ? process.env.NODE_ENV : 'client');
  }

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
  static initializeStores() {
    let screenStore = ScreenStore.getInstance();

    return {
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
   * 外部データを取得して展開する
   * @return {Promise}
   */
  loadStorages() {
    return Promise.resolve();
    //return Promise.all([
    //  this._stores.visitStore.restore()
    //]);
  }

  /**
   * アプリケーションを開始する、各種タイマーも起動される
   * @return {Promise}
   */
  start() {
    return this.loadStorages();
  }
}
