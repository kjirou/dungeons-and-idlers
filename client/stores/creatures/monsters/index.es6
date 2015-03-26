import {dictionarize} from 'client/lib/core';
import MonsterStore from 'client/stores/creatures/monsters/monster';


export var GoblinStore = MonsterStore.extend({}, {
  typeId: 'goblin',
  maxHp: 3,
  physicalAttackPower: 1,
  actions: [
    { type: 'physical_attack' },
    { type: 'physical_attack' }
  ]
});

export var MinotaurStore = MonsterStore.extend({}, {
  typeId: 'minotaur',
  maxHp: 5,
  physicalAttackPower: 2,
  actions: [
    { type: 'physical_attack' },
    null,
    { type: 'physical_attack' },
    null,
    { type: 'hard_blow' }
  ]
});


export var monsters = dictionarize([
  GoblinStore,
  MinotaurStore
], 'typeId');
