import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {listize} from 'client/lib/core';
import {jobs} from 'client/lib/jobs';
import Store from 'client/stores/store';


// レベル管理をモジュール化する？
//const VISIT_LEVELS = (() => {
//  return [
//    [null, 0],
//  ].map(([intervalHours, necessaryMoney], idx) => {
//    return {
//      level: idx
//    };
//  });
//})();


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
      lastVisitedAt: null
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

  /**
   * 来訪レベルから来訪間隔をミリ秒で取得する
   *
   * 要件
   * - 最大レベルは 10,12,15 とか、ある程度キリのいい値
   * - 目標を作り易いように、5 までは上昇しやすく上がり幅も大きくする
   *
   * @return {number|null}
   */
  _getIntervalByVisitLevel(level) {
    let hourTime = 60 * 60 * 1000;
    return {
      1: 24 * hourTime,
      2: 21 * hourTime,
      3: 18 * hourTime,
      4: 15 * hourTime,
      5: 12 * hourTime,
      6: 10 * hourTime,
      7: 9 * hourTime,
      8: 8 * hourTime,
      9: 7 * hourTime,
      10: 6 * hourTime
    }[level] || null;
  },

  _isMaxVisitLevel(level) {
  },

  restore() {
    var now = (new Date()).getTime();

    var dummyStorageData = {
      fighter: {
        level: 5,
        lastVisitedAt: now - 86400000 / 2
      },
      theif: {
        level: 1,
        lastVisitedAt: now - 86400000
      },
      mage: {
        level: 3,
        lastVisitedAt: now - 86400000 / 4,
        foo: 1  // 存在しない項目
      },
      priest: {
        level: 0,
        lastVisitedAt: null
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
}, {
  VISIT_LEVELS
});
