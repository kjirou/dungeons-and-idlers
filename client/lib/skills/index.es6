import _ from 'lodash';
import _s from 'underscore.string';

import {createCounter, dictionarize} from 'client/lib/core';
import Skill from 'client/lib/skills/skill';


function _classifyTypeId(typeId) {
  return _s.classify(typeId + 'Skill');
}

let _counter = createCounter();


export var skillList = [];


//
// sub action skills
//
[
  { typeId: 'disturbance', _name: '撹乱', _equipmentCost: 4,
    _summary: '[タイル1, 敵1人]へ[防御低下1]を付与' },
  { typeId: 'redemption', _name: '贖罪', _equipmentCost: 8,
    _summary: '[自分以外, 味方1人, 任意]へ[贖罪1]を実行' },
  { typeId: 'shooting', _name: '射撃', _equipmentCost: 6,
    _summary: '[距離2-3, 敵1人, 任意]へ[射撃1]を実行' },
  { typeId: 'sniping', _name: '狙撃', _equipmentCost: 8,
    _summary: '[距離3-5, 敵1人, 任意]へ[射撃1]を実行' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let skill = _.assign({}, Skill, { serialNumber: _counter(), category: 'sub_action' }, source);
  skillList.push(skill);
  exports[exportName] = skill;
});


//
// other skills
//
//   初期表示順の関係で、deck より先に定義する
//
[
  { typeId: 'hard_blow', _name: '強打', _equipmentCost: 5,
    _summary: '[攻撃3]を[強打]へ置換' },
  { typeId: 'katana', _name: '刀', _equipmentCost: 12, _physicalAttackPower: 1,
    _summary: '攻撃力: +1' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let skill = _.assign({}, Skill, { serialNumber: _counter(), category: 'skill' }, source);
  skillList.push(skill);
  exports[exportName] = skill;
});


//
// deck skills
//
[
  { typeId: 'acceleration', _name: '加速', _equipmentCost: 2,
    _summary: '[自分]へ[行動力増加1]を実行 / 疲れない' },
  { typeId: 'dart', _name: '投げ矢',
    _summary: '[距離1, 敵1人]へ[射撃1]を実行' },
  { typeId: 'flash', _name: '閃光', _equipmentCost: 5,
    _summary: '[照明3]を実行 / [タイル1-2, 敵全員]へ[盲目1]を付与' },
  { typeId: 'haste', _name: '急速', _equipmentCost: 8,
    _summary: '[味方全員]へ[行動力増加1]を実行' },
  { typeId: 'lantern', _name: 'ランタン', _equipmentCost: 1, actionPowerCost: 0,
    _summary: '[自分]へ[照明1]を付与 / 疲れない' },
  { typeId: 'torch', _name: '松明',
    _summary: '[自分]へ[照明1]を付与' },
  { typeId: 'poison_dart', _name: '毒付き投げ矢', _equipmentCost: 2,
    _summary: '[距離1, 敵1人]へ[射撃1]を実行＆[毒1]を付与' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let skill = _.assign({}, Skill, { serialNumber: _counter(), category: 'deck' }, source);
  skillList.push(skill);
  exports[exportName] = skill;
});


export var skills = dictionarize(skillList, 'typeId');
