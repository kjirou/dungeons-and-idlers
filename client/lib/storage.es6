import {Promise} from 'bluebird';
import escapeRegExp from 'escape-regexp';
import MockLocalStorage from 'mock-localstorage';

import conf from 'client/conf';

var realLocalStorage;  // ifブロック内で宣言するとクラス内で参照不可
if (typeof localStorage === 'undefined') {
  realLocalStorage = new MockLocalStorage();
} else {
  realLocalStorage = localstorage;
}


export default class Storage {

  static _getLocalStorage() {
    return realLocalStorage;
  }

  /**
   * 実行環境キーを名前空間にして、内部しか影響できないようにする
   *
   * とりあえずは、ブラウザで手動デバッグ中にTestemを実行しても
   * データが影響を受けないようにするため
   */
  static _getNamespace() {
    return conf.env + ':';
  }

  save(fieldPath, data) {
    let realFieldPath = Storage._getNamespace() + fieldPath;
    realLocalStorage.setItem(realFieldPath, JSON.stringify(data));
    return Promise.resolve();
  }

  fetch(fieldPath) {
    let realFieldPath = Storage._getNamespace() + fieldPath;
    let data = realLocalStorage.getItem(realFieldPath);
    if (data === undefined || data === null) {
      data = null;
    } else {
      data = JSON.parse(data);
    }
    return Promise.resolve(data);
  }

  remove(fieldPath) {
    let realFieldPath = Storage._getNamespace() + fieldPath;
    realLocalStorage.removeItem(realFieldPath);
    return Promise.resolve();
  }

  static clear() {
    let matcher = new RegExp('^' + escapeRegExp(this._getNamespace()));
    for (let i = 0; i < realLocalStorage.length; i++) {
      let k = realLocalStorage.key(i);
      if (matcher.test(k)) {
        realLocalStorage.removeItem(k);
      }
    }
    return Promise.resolve();
  }
};
