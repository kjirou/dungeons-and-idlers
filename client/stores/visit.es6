import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {listize} from 'client/lib/core';
import {jobs} from 'client/lib/jobs';
import Store from 'client/stores/store';


export default Store.extend({

  defaults() {
    return {
      visitors: {}
    };
  },

  initialize() {
    this._coreDispatcher = CoreDispatcher.getInstance();
  },

  _createDefaultVisitorData() {
    return {
      level: 0,
      isVisited: false,
      startedAt: null
    };
  },

  getVisitors() {
    let visitorsData = this.get('visitors');
    let visitors = {};
    Object.keys(jobs).forEach((jobTypeId) => {
      let job = jobs[jobTypeId];
      visitors[jobTypeId] = _.assign(this._createDefaultVisitorData(), {
        name: job.getName()
      }, visitorsData[jobTypeId]);
    });
    return visitors;
  },

  getVisitorsAsList() {
    return listize(this.getVisitors(), 'jobTypeId').sort((a, b) => {
      if (a.jobTypeId < b.jobTypeId) {
        return -1;
      } else if (a.jobTypeId > b.jobTypeId) {
        return 1;
      }
      return 0;
    });
  },

  // コネクションレベルと来訪間隔
  //
  // 見た目いい感じの最大LVを最初に決めて、間隔は適当にする
  //
  // 等倍でやると後半の方が1目盛の価値が上がるし
  // それにお金を掛けるとなんかわかりにくいし
  //
  // 誰をどこまで上げればのメリハリもつけにくいので、
  // とりあえず 5 まで上げる感じに調整する
  //
  // Lv0 = 未契約
  //   1 = 24h (+ 即座に一人)
  //   2 = 21h
  //   3 = 18h
  //   4 = 15h
  //   5 = 12h
  //   6 = 10h
  //   7 = 9h
  //   8 = 8h
  //   9 = 7h
  //  10 = 6h

  // マスターがずれた場合に整合させる処理
  restore() {
    var now = (new Date()).getTime();

    var dummyStorageData = {
      fighter: {
        level: 5,
        isVisited: true,
        startedAt: now - 86400000 / 2
      },
      theif: {
        level: 1,
        isVisited: false,
        startedAt: now - 86400000
      },
      mage: {
        level: 3,
        isVisited: false,
        startedAt: now - 86400000 / 4,
        isFoo: true  // 存在しない項目
      },
      priest: {
        level: 0,
        isVisited: false,
        startedAt: null
      },

      // 存在しない職業
      unexistsman: {
      }
    };

    let defaultVisitorData = this._createDefaultVisitorData();
    let visitors = {};
    Object.keys(jobs).forEach((jobTypeId) => {
      let storage = dummyStorageData[jobTypeId] || {};
      storage = _.assign(defaultVisitorData, storage);
      storage = _.pick(storage, ...Object.keys(defaultVisitorData));
      visitors[jobTypeId] = storage;
    });
    this.set('visitors', _.cloneDeep(visitors));

    return Promise.resolve();
  }
});
