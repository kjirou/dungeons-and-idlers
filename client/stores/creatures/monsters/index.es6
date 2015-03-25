import MonsterStore from 'client/stores/creatures/monsters/monster';


export GoblinStore = MonsterStore.extend({}, {
  typeId: 'goblin',
  maxHp: 3,
  physicalAttackPower: 1,
  actions: [
    { type: 'physical_attack' },
    { type: 'physical_attack' }
  ]
});

export MinotaurStore = MonsterStore.extend({}, {
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


let monsters = ((monsterClasses) => {
  let mappedMonsters = {};
  monsterClasses.forEach((monsterClass) => {
    mappedMonsters[monsterClass.typeId] = monsterClass;
  });
  return mappedMonsters;
})([
  GoblinStore,
  MinotaurStore
]);


export const monsters = monsters;
