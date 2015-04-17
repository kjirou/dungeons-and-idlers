import _ from 'lodash';

import {dictionarize} from 'client/lib/core';
import Job from 'client/lib/jobs/job';


export var AlchemistJob = _.assign({}, Job, {
  typeId: 'alchemist',
  _maxHp: 3,
  _physicalAttackPower: 1
});

export var ClericJob = _.assign({}, Job, {
  typeId: 'cleric',
  _maxHp: 5,
  _maxHandCardCount: 2,
  _physicalAttackPower: 2
});

export var CreatureJob = _.assign({}, Job, {
  typeId: 'creature',
  _name: 'No Class',
  isPlayable: false
});

export var DummyJob = _.assign({}, Job, {
  typeId: 'dummy',
  isPlayable: false
});

export var FighterJob = _.assign({}, Job, {
  typeId: 'fighter',
  _maxHp: 6,
  _physicalAttackPower: 3
});

export var HealerJob = _.assign({}, Job, {
  typeId: 'healer',
  _maxHp: 5,
  _physicalAttackPower: 1
});

export var KnightJob = _.assign({}, Job, {
  typeId: 'knight',
  _maxHp: 8,
  _physicalAttackPower: 2
});

export var MageJob = _.assign({}, Job, {
  typeId: 'mage',
  _maxHp: 3,
  _physicalAttackPower: 1
});

export var RangerJob = _.assign({}, Job, {
  typeId: 'ranger',
  _maxHp: 4,
  _physicalAttackPower: 2
});

export var ThiefJob = _.assign({}, Job, {
  typeId: 'thief',
  _maxHp: 3,
  _maxHandCardCount: 4,
  _physicalAttackPower: 1
});


export var jobList = [
  AlchemistJob,
  ClericJob,
  CreatureJob,
  DummyJob,
  FighterJob,
  HealerJob,
  KnightJob,
  MageJob,
  RangerJob,
  ThiefJob
];
export var playableJobList = jobList.filter((job) => { return job.isPlayable; });
export var jobs = dictionarize(jobList, 'typeId');
