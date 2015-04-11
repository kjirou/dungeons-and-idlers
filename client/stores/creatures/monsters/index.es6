import {dictionarize} from 'client/lib/core';
import MonsterStore from 'client/stores/creatures/monsters/monster';


export var GoblinStore = MonsterStore.extend({}, {
  typeId: 'goblin',
  maxHp: 3,
  physicalAttackPower: 1
});

export var MinotaurStore = MonsterStore.extend({}, {
  typeId: 'minotaur',
  maxHp: 5,
  physicalAttackPower: 2,
  attackUpdates: {
    3: { type: 'hard_blow', name: '強打' }
  }
});


export var monsters = dictionarize([
  GoblinStore,
  MinotaurStore
], 'typeId');
