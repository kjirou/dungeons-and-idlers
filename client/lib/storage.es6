import {Promise} from 'bluebird';
import escapeRegExp from 'escape-regexp';
import MockLocalStorage from 'mock-localstorage';

import conf from 'client/conf';

var localStorage;  // ifブロック内で宣言するとクラス内で参照不可
if (typeof localStorage === 'undefined') {
  localStorage = new MockLocalStorage();
}


export default class Storage {

  static _getLocalStorage() {
    return localStorage;
  }

  /**
   * 実行環境キーを名前空間にして、内部しか影響できないようにする
   *
   * とりあえずは、ブラウザで手動デバッグ中にTestemを実行しても
   * データが影響を受けないようにするため
   */
  _getNamespace() {
    return conf.env + ':';
  }

  save(fieldPath, data) {
    let realFieldPath = this._getNamespace() + fieldPath;
    localStorage.setItem(realFieldPath, JSON.stringify(data));
    return Promise.resolve();
  }

  fetch(fieldPath) {
    let realFieldPath = this._getNamespace() + fieldPath;
    let data = localStorage.getItem(realFieldPath);
    if (data === undefined || data === null) {
      data = null;
    } else {
      data = JSON.parse(data);
    }
    return Promise.resolve(data);
  }

  remove(fieldPath) {
    let realFieldPath = this._getNamespace() + fieldPath;
    localStorage.removeItem(realFieldPath);
    return Promise.resolve();
  }

  clear() {
    let matcher = new RegExp('^' + escapeRegExp(this._getNamespace()));
    for (let i = 0; i < localStorage.length; i++) {
      let k = localStorage.key(i);
      if (matcher.test(k)) {
        localStorage.removeItem(k);
      }
    }
    return Promise.resolve();
  }
};
