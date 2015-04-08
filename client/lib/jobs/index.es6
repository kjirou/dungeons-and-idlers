import _ from 'lodash';

import {dictionarize} from 'client/lib/core';
import Job from 'client/lib/jobs/job';


export var AlchemistJob = _.assign({}, Job, {
  typeId: 'alchemist',
  maxHp: 3,
  maxHandCard: 4,
  physicalAttackPower: 1
});

export var DummyJob = _.assign({}, Job, {
  typeId: 'dummy',
  isPlayable: false
});

export var FighterJob = _.assign({}, Job, {
  typeId: 'fighter',
  maxHp: 6,
  maxHandCard: 2,
  physicalAttackPower: 3
});

export var HealerJob = _.assign({}, Job, {
  typeId: 'healer',
  maxHp: 5,
  physicalAttackPower: 1
});

export var KnightJob = _.assign({}, Job, {
  typeId: 'knight',
  maxHp: 8,
  physicalAttackPower: 2
});

export var MageJob = _.assign({}, Job, {
  typeId: 'mage',
  maxHp: 3,
  physicalAttackPower: 1
});

export var PriestJob = _.assign({}, Job, {
  typeId: 'priest',
  maxHp: 4,
  physicalAttackPower: 2
});

export var RangerJob = _.assign({}, Job, {
  typeId: 'ranger',
  maxHp: 4,
  physicalAttackPower: 2
});

export var ThiefJob = _.assign({}, Job, {
  typeId: 'thief',
  maxHp: 3,
  physicalAttackPower: 1
});


export var jobList = [
  AlchemistJob,
  DummyJob,
  FighterJob,
  HealerJob,
  KnightJob,
  MageJob,
  PriestJob,
  RangerJob,
  ThiefJob
];
export var playableJobList = jobList.filter((job) => { return job.isPlayable; });
export var jobs = dictionarize(jobList, 'typeId');
