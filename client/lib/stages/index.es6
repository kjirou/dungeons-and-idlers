import _ from 'lodash';
import _s from 'underscore.string';

import {createCounter, dictionarize} from 'client/lib/core';
import Stage from 'client/lib/stages/stage';
import StageFolder from 'client/lib/stages/stage-folder';


//
// StageFolder (1ダンジョンに相当)
//

function _classifyStageFolderTypeId(typeId) {
  return _s.classify(typeId + 'StageFolder');
}
let _stageFolderCounter = createCounter();

export var stageFolderList = [];

[
  {
    typeId: 'dummy', _name: 'ダミー洞窟',
    _summary: 'ダミー'
  },
  {
    typeId: 'training_room', _name: '訓練所',
    _summary: '村人, 教官, シューター'
  },
  {
    typeId: 'goblins_cave', _name: 'ゴブリンの洞窟', _iconId: 'goblin',
    _summary: 'ゴブリン, 大蝙蝠, トロル, 仕掛け弓'
  },
  {
    typeId: 'vermin_extermination', _name: '害獣駆除',
    _summary: '野良犬, 毒蛇, 熊, 落とし穴'
  },
  {
    typeId: 'grave_cleaning', _name: '墓掃除', difficulty: 2,
    _summary: 'スケルトン, ゾンビ, ゴースト, 落とし穴, 呪いの魔法陣'
  }
].forEach((source) => {
  let exportName = _classifyStageFolderTypeId(source.typeId);
  let extended = _.assign({}, StageFolder, {
    serialNumber: _stageFolderCounter()
  }, source);
  stageFolderList.push(extended);
  exports[exportName] = extended;
});

export var stageFolders = dictionarize(stageFolderList, 'typeId');


//
// Stage (ダンジョンの1フロアに相当)
//

function _classifyStageTypeId(typeId) {
  return _s.classify(typeId + 'Stage');
}
let _stageCounter = createCounter();

export var stageList = [];

[
  {
    typeId: 'dummy', _name: 'ダミー', folder: stageFolders.dummy,
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
