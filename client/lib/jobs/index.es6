import _ from 'lodash';

import {dictionarize} from 'client/lib/core';
import Job from 'client/lib/jobs/job';


export var FighterJob = _.assign({}, Job, {
  typeId: 'fighter',
  maxHp: 6,
  physicalAttackPower: 3
});

export var KnightJob = _.assign({}, Job, {
  typeId: 'knight',
  maxHp: 8,
  physicalAttackPower: 2
});

export var RangerJob = _.assign({}, Job, {
  typeId: 'ranger',
  maxHp: 3,
  physicalAttackPower: 2
});

export var ThiefJob = _.assign({}, Job, {
  typeId: 'thief',
  maxHp: 3,
  physicalAttackPower: 1
});


export var jobs = dictionarize([
  FighterJob,
  KnightJob,
  RangerJob,
  ThiefJob
], 'typeId');
