import escapeRegExp from 'escape-regexp';
import MockLocalStorage from 'mock-localstorage';

import App from 'client/app';

var localStorage;  // ifブロック内で宣言するとクラス内で参照不可
let isMockLocalStorage = false;
if (typeof localStorage === 'undefined') {
  localStorage = new MockLocalStorage();
  isMockLocalStorage = true;
}


export default class Storage {

  _getLocalStorage() {
    return localStorage;
  }

  /**
   * 実行環境キーを名前空間にして、内部しか影響できないようにする
   *
   * とりあえずは、ブラウザで手動デバッグ中にTestemを実行しても
   * データが影響を受けないようにするため
   */
  _getNamespace() {
    return App.getEnv() + ':';
  }

  save(fieldPath, data) {
    let realFieldPath = this._getNamespace() + fieldPath;
    localStorage.setItem(realFieldPath, JSON.stringify(data));
  }

  fetch(fieldPath) {
    let realFieldPath = this._getNamespace() + fieldPath;
    let data = localStorage.getItem(realFieldPath);
    if (data === undefined || data === null) {
      data = null;
    } else {
      data = JSON.parse(data);
    }
    return data;
  }

  remove(fieldPath) {
    let realFieldPath = this._getNamespace() + fieldPath;
    localStorage.removeItem(realFieldPath);
  }

  clear() {
    let matcher = new RegExp('^' + escapeRegExp(this._getNamespace()));
    for (let i = 0; i < localStorage.length; i++) {
      let k = localStorage.key(i);
      if (isMockLocalStorage) {
        k = unescape(k);  // mock-localstorage 内で何故か escape されているので
      }
      if (matcher.test(k)) {
        localStorage.removeItem(k);
      }
    }
  }
};
