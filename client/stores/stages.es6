import {Promise} from 'bluebird';
import _ from 'lodash';

import CoreDispatcher from 'client/dispatcher/core';
import {stages} from 'client/lib/stages';
import Store from 'client/stores/store';


//let StagesStore = Store.extend({
//
//  storageName: 'store:stages',
//
//  defaults() {
//    return {
//      /**
//       * [stageTypeId]: {data} のセット
//       *
//       * 座標情報は無視するので、マスターデータの場所を変えたら不自然なことになる
//       */
//      stages: {}
//    };
//  },
//
//  initialize() {
//    Store.prototype.initialize.apply(this);
//
//    this._world = [];
//
//    this.propGetter('stages');
//
//    this.syncAttributesToStates();
//  },
//
//  this.syncAttributesToStates() {
//    this._world = this._generateWorld();
//  },
//
//  /**
//   * stages.worldリソースとストレージの状態を結合して現ワールドマップを生成する
//   */
//  _generateWorld() {
//    let world = [];
//    stages.world.map.forEach((worldRowDefinition, rowIndex) => {
//      let worldRow = [];
//      world.push(worldRow);
//      worldRowDefinition.forEach((worldCellDefinition, columnIndex) => {
//        worldRow.push(this._generateWorldCell([rowIndex, columnIndex], worldCellDefinition));
//      });
//    });
//    return world;
//  },
//
//  /**
//   * @param {Object} stages.worldのmapの1セル定義
//   */
//  _generateWorldCell(pos, { stage }) {
//    let cell = {
//      // 位置、面倒なのでセルに入れる
//      pos,
//      // ステージセルである場合はステージ情報
//      stage: stage ? this._generateStage(stage) : null,
//      // 表示/到達可能か。他セル依存で都度同期が必要
//      isVisible: false,
//      isReachable: false
//    };
//    return cell;
//  },
//
//  /**
//   * @param {Object} stages.world.mapのセル内の1ステージ定義
//   */
//  _generateStage({ typeId }) {
//    let attrs = _.assign({
//      victoryCount: 0,
//      defeatCount: 0
//    }, this.get('stages')[typeId] || {});
//
//    return {
//      definition: stages[typeId],
//      // 勝利回数
//      victoryCount: attrs.victoryCount,
//      // 敗北回数
//      defeatCount: attrs.defeatCount
//    };
//  },
//
//  /**
//   * @return {Object|null}
//   */
//  getWorldCell([rowIndex, columnIndex]) {
//    return (this._world[rowIndex] || [])[columnIndex] || null;
//  },
//
//  syncWorldCells() {
//    _.flatten(this._world).forEach((cell) => {
//    });
//  }
//});
//
//
//StagesStore.MapCell = class MapCell {
//
//  constructor(pos, settings) {
//    // 設定値の展開
//    settings = _.assign({
//      stageTypeId: null,
//      isVisible: false,
//      isVisitable: false
//    }, settings);
//
//    // 位置
//    this._pos = pos;
//
//    // ステージ
//    this._stage = settings.stageTypeId ? stages[settings.stageTypeId] : null;
//
//    // ステージの状態
//    this._stageStates = {
//      victoryCount: 0,
//      defeatCount: 0
//    };
//
//    this._isVisible = settings.isVisible;
//    this._isVisitable = settings.isVisitable;
//
//    // 隣接ステージが一度以上来訪されている
//    this.hasVisitInNeighborhood = false;
//
//    // 隣接ステージが一度以上勝利されている
//    this.hasVictoryInNeighborhood = false;
//  },
//
//  restore(data) {
//    data = _.assign({
//    }, data);
//    this._stageStates.victoryCount = data.victoryCount;
//    this._stageStates.defeatCount = data.defeatCount;
//  },
//
//  isStage() {
//    return !! this._stage;
//  },
//
//  isRoute() {
//    return !this.isStage();
//  },
//
//  isVisible() {
//    return this._isVisible ||
//      this.hasVisitInNeighborhood
//    ;
//  },
//
//  isVisitable() {
//    return this._isVisitable ||
//      (this.isRoute() || this.hasVictoryInNeighborhood) && this.hasVisitInNeighborhood
//    ;
//  }
//};


//export default StagesStore;
