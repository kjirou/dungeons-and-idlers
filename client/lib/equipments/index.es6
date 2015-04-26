import _ from 'lodash';
import _s from 'underscore.string';

import {createCounter, dictionarize} from 'client/lib/core';
import Equipment from 'client/lib/equipments/equipment';


function _classifyTypeId(typeId) {
  return _s.classify(typeId + 'Equipment');
}

let _counter = createCounter();


export var equipmentList = [];


//
// sub action equipments
//
[
  { typeId: 'disturbance', _name: '撹乱', _iconId: 'unhappy', _equipmentCost: 4,
    _summary: '[タイル1, 敵1人]へ[防御低下1]を付与' },
  { typeId: 'redemption', _name: '贖罪', _iconId: 'heart', _equipmentCost: 8,
    _summary: '[自分以外, 味方1人, 任意]へ[贖罪1]を実行' },
  { typeId: 'shooting', _name: '射撃', _iconId: 'bow', _equipmentCost: 6,
    _summary: '[距離2-3, 敵1人, 任意]へ[射撃1]を実行' },
  { typeId: 'sniping', _name: '狙撃', _iconId: 'bow',  _equipmentCost: 8,
    _summary: '[距離3-5, 敵1人, 任意]へ[射撃1]を実行' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let equipment = _.assign({}, Equipment, { serialNumber: _counter(), category: 'sub_action' }, source);
  equipmentList.push(equipment);
  exports[exportName] = equipment;
});


//
// feat
//
//   その他的な分類のものも含むが、表示上の問題でこの位置にする
//
[
  { typeId: 'excessively_theoretical', _name: '頭でっかち', _iconId: 'brain',
    _maxHandCardCount: -1, _maxDeckCardCount: 3,
    _summary: '手札:-1, デッキ:+3' },
  { typeId: 'hard_blow', _name: '強打', _iconId: 'sword', _equipmentCost: 5,
    _summary: '[攻撃3]を[強打]へ置換' },
  { typeId: 'indoors_type', _name: 'インドア派', _iconId: 'nerd',
    _maxHp: -2, _maxDeckCardCount: 2,
    _summary: 'HP:-1, デッキ:+1, スキル:後攻' },
  { typeId: 'katana', _name: '刀', _equipmentCost: 12, _physicalAttackPower: 1,
    _summary: '攻撃力:+1' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let equipment = _.assign({}, Equipment, { serialNumber: _counter(), category: 'feat' }, source);
  equipmentList.push(equipment);
  exports[exportName] = equipment;
});


//
// deck equipments
//
[
  { typeId: 'acceleration', _name: '加速', _iconId: 'running', _equipmentCost: 2,
    _summary: '[自分]へ[行動力増加1]を実行 / 疲れない' },
  { typeId: 'dart', _name: '投げ矢', _iconId: 'arrow',
    _summary: '[距離1, 敵1人]へ[射撃1]を実行' },
  { typeId: 'flash', _name: '閃光', _equipmentCost: 5,
    _summary: '[照明3]を実行 / [タイル1-2, 敵全員]へ[盲目1]を付与' },
  { typeId: 'haste', _name: '急速', _iconId: 'running', _equipmentCost: 8,
    _summary: '[味方全員]へ[行動力増加1]を実行' },
  { typeId: 'lantern', _name: 'ランタン', _equipmentCost: 1, actionPowerCost: 0,
    _summary: '[自分]へ[照明1]を付与 / 疲れない' },
  { typeId: 'torch', _name: '松明',
    _summary: '[自分]へ[照明1]を付与' },
  { typeId: 'poison_dart', _name: '毒付き投げ矢', _iconId: 'arrow', _equipmentCost: 2,
    _summary: '[距離1, 敵1人]へ[射撃1]を実行＆[毒1]を付与' }
].forEach((source) => {
  let exportName = _classifyTypeId(source.typeId);
  let equipment = _.assign({}, Equipment, { serialNumber: _counter(), category: 'deck' }, source);
  equipmentList.push(equipment);
  exports[exportName] = equipment;
});


export var equipments = dictionarize(equipmentList, 'typeId');
