import _ from 'lodash';
import _s from 'underscore.string';

import {createCounter, dictionarize} from 'client/lib/core';
import Route from 'client/lib/stages/route';
import Stage from 'client/lib/stages/stage';


//
// Route
//

function _classifyRouteTypeId(typeId) {
  return _s.classify(typeId + 'Route');
}
let _routeCounter = createCounter();

export var routeList = [];

[
  {
    typeId: 'highway', _name: '街道',
    _iconIds: { vertical: 'vertical_bridge', horizontal: 'horizontal_bridge' }
  }
].forEach((source) => {
  let exportName = _classifyRouteTypeId(source.typeId);
  let extended = _.assign({}, Route, {
    serialNumber: _routeCounter()
  }, source);
  routeList.push(extended);
  exports[exportName] = extended;
});

export var routes = dictionarize(routeList, 'typeId');


//
// Stage
//

function _classifyStageTypeId(typeId) {
  return _s.classify(typeId + 'Stage');
}
let _stageCounter = createCounter();

export var stageList = [];

[
  {
    typeId: 'dummy', _name: 'ダミー',
    description: 'ダミーのステージです'
  }
].forEach((source) => {
  let exportName = _classifyStageTypeId(source.typeId);
  let extended = _.assign({}, Stage, {
    serialNumber: _stageCounter()
  }, source);
  stageList.push(extended);
  exports[exportName] = extended;
});

export var stages = dictionarize(stageList, 'typeId');
