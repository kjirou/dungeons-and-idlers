import assert from 'assert';
import _ from 'lodash';

import Storage from 'client/lib/storage';
import {skills, LanternSkill, SnipingSkill, TorchSkill} from 'client/lib/skills';
import CardsStore from 'client/stores/cards';


describe('client/stores/cards module', function() {

  beforeEach(function() {
    return Storage.clear();
  });

  it('constructor', function() {
    let s = new CardsStore();
    assert(s instanceof CardsStore);
  });

  it('addCard', function() {
    let s = new CardsStore();
    assert.throws(function() {
      s.addCard('not_exists');
    }, /not_exists/, '存在しないカードを指定');

    s.addCard('torch');
    assert.strictEqual(s.cards[0].skill, TorchSkill);
    assert.strictEqual(typeof s.cards[0].addedAt, 'number');

    s.addCard('torch', { addedAt: 1 });
    assert.deepEqual(s.cards[1], {
      skill: TorchSkill,
      addedAt: 1
    }, 'addedAt明示指定, 常に末尾にpush, 同じskill指定可能');
  });

  it('_createCardData', function() {
    let s = new CardsStore();
    let cardData = s._createCardData('bar', 1);
    assert.deepEqual(cardData, {
      skillTypeId: 'bar',
      addedAt: 1
    });
  });


  context('card aggregation', function() {

    beforeEach(function() {
      let s = new CardsStore();
      s.set('cards', [
        { skillTypeId: 'torch', addedAt: 1 },
        { skillTypeId: 'sniping', addedAt: 2 },
        { skillTypeId: 'lantern', addedAt: 3 },
        { skillTypeId: 'torch', addedAt: 4 }
      ]);
      s.syncAttributesToStates();
      this.s = s;
    });

    it('aggregateCards', function() {
      let s = this.s;
      assert.strictEqual(s.cards.length, 4);
      assert.strictEqual(s._aggregatedCards.length, 0);

      s.aggregateCards();
      assert.strictEqual(s._aggregatedCards.length, 3);
      assert.deepEqual(s._aggregatedCards, [
        { skill: TorchSkill, lastAddedAt: 4, count: 2 },
        { skill: SnipingSkill, lastAddedAt: 2, count: 1 },
        { skill: LanternSkill, lastAddedAt: 3, count: 1 }
      ]);
      assert.deepEqual(s.aggregatedCounts, {
        all: 3,
        sub_action: 1,
        feat: 0,
        deck: 2
      });
    });

    it('findAggregatedCards', function() {
      let s = this.s;
      s.aggregateCards();
      assert.strictEqual(s.findAggregatedCards().length, 3);

      // conditions
      let conds;
      conds = {
        skill: {
          category: 'deck'
        }
      };
      assert.strictEqual(s.findAggregatedCards({ conditions: conds }).length, 2);
      conds = {
        skill: {
          typeId: 'torch'
        }
      };
      assert.strictEqual(s.findAggregatedCards({ conditions: conds }).length, 1);

      // sort
      let sorted;
      sorted = s.findAggregatedCards();
      assert.strictEqual(sorted[0].skill.typeId, 'sniping');
      assert.strictEqual(sorted[1].skill.typeId, 'lantern');
      assert.strictEqual(sorted[2].skill.typeId, 'torch');

      sorted = s.findAggregatedCards({ sort: 'recent' });
      assert.strictEqual(sorted[0].skill.typeId, 'torch');
      assert.strictEqual(sorted[1].skill.typeId, 'lantern');
      assert.strictEqual(sorted[2].skill.typeId, 'sniping');
    });
  });


  context('store and restore', function() {

    it('should be', function() {
      let s = new CardsStore();
      let s2;
      assert.deepEqual(s.get('cards'), []);
      assert.deepEqual(s.cards, []);
      return s
        .restore()
        .then(() => {
          assert.deepEqual(s.get('cards'), []);
          assert.deepEqual(s.cards, []);
          s.addCard('torch', { addedAt: 1 });
          s.addCard('torch', { addedAt: 2 });
          return s.store();
        })
        .then(() => {
          s2 = new CardsStore();
          return s2.restore();
        })
        .then(() => {
          assert.deepEqual(s2.get('cards'), [
            { skillTypeId: 'torch', addedAt: 1 },
            { skillTypeId: 'torch', addedAt: 2 }
          ]);
          assert.deepEqual(s2.cards, [
            { skill: TorchSkill, addedAt: 1 },
            { skill: TorchSkill, addedAt: 2 }
          ]);
        })
      ;
    });

    it('should backup deleted cards', function() {
      let s = new CardsStore();
      let s2, s3;
      assert.deepEqual(s.get('deletedCards'), []);
      return s
        .restore()
        .then(() => {
          s.get('cards').push(
            s._createCardData('not_exists_1', 1)
          );
          s.get('cards').push(
            s._createCardData('torch', 2)
          );
          s.get('cards').push(
            s._createCardData('not_exists_2', 3)
          );
          return s.save();
        })
        .then(() => {
          s2 = new CardsStore();
          return s2.restore();
        })
        .then(() => {
          assert.deepEqual(s2.cards, [
            { skill: TorchSkill, addedAt: 2 }
          ]);
          assert.deepEqual(s2.get('deletedCards'), [
            { skillTypeId: 'not_exists_1', addedAt: 1 },
            { skillTypeId: 'not_exists_2', addedAt: 3 }
          ]);
          return s2.store();
        })
        .then(() => {
          s3 = new CardsStore();
          return s3.restore();
        })
        .then(() => {
          assert.deepEqual(s3.get('deletedCards'), [
            { skillTypeId: 'not_exists_1', addedAt: 1 },
            { skillTypeId: 'not_exists_2', addedAt: 3 }
          ], 'storeを再度通した場合もデータが消えていない');
        })
      ;
    });
  });
});
