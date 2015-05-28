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
  //
  // 固定ステージ
  //
  {
    typeId: 'goblins_cave', _name: 'ゴブリンの洞窟', _iconId: 'goblins_cave',
    description: '近隣に迷惑を掛けているいたずらゴブリンたちを懲らしめよう。'
  },
  {
    typeId: 'training_range', _name: '訓練場', _iconId: 'village',
    description: '村近くにある訓練場、というかほとんど野原。'
  },
  {
    typeId: 'your_village', _name: 'あなたの村', _iconId: 'village',
    description: 'あなたと仲間達が暮らす豊かでのどかな村。望まれぬ冒険の旅はここから始まる。'
  },

  //
  // ランダム生成ステージ
  //
  {
    typeId: 'quest_1', _name: '討伐依頼１', _iconId: 'crossed_swords',
    description: '街のギルドで募集のある簡単な討伐依頼を請け負います。'
  },
  {
    typeId: 'quest_2', _name: '討伐依頼２', _iconId: 'crossed_swords',
    description: '街のギルドで募集のある普通の討伐依頼を請け負います。'
  },
  {
    typeId: 'quest_3', _name: '討伐依頼３', _iconId: 'crossed_swords',
    description: '街のギルドで募集のある難しい討伐依頼を請け負います。'
  },
  {
    typeId: 'quest_4', _name: '討伐依頼４', _iconId: 'crossed_swords',
    description: '街のギルドで募集のあるとても難しい討伐依頼を請け負います。'
  },

  //
  // ワールドマップ
  //
  {
    typeId: 'world',
    map: [
      // 0
      [
        // 0-3
        {
          isVisitable: true,
          isVisible: true,
          stageTypeId: 'your_village'
        },
        {},
        {
          stageTypeId: 'quest_1'
        },
        {},
        // 4-7
        {},
        {
          stageTypeId: 'quest_2'
        },
        {
          stageTypeId: 'quest_3'
        },
        {},
        // 8-11
        {},
        {
          stageTypeId: 'quest_4'
        },
        {
          stageTypeId: 'quest_5'
        },
        {}//,
      ],
      // 1
      [
        {}//,
      ],
      // 2
      [
        {
          stageTypeId: 'training_range'
        }//,
      ],
      // 3
      [
        {}//,
      ],
      // 4
      [
        {
          stageTypeId: 'goblins_cave'
        }//,
      ],
    ]
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
