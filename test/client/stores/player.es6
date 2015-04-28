import assert from 'assert';
import _ from 'lodash';

import Storage from 'client/lib/storage';
import PlayerStore from 'client/stores/player';


describe('client/stores/player module', function() {

  beforeEach(function() {
    return Storage.clear();
  });

  it('constructor', function() {
    let s = new PlayerStore();
    assert(s instanceof PlayerStore);
  });

  context('fame level', function() {

    it('should be', function() {
      let s = new PlayerStore();
      assert.strictEqual(s._fameLevelObject.getMinLevel(), 1);
      assert.strictEqual(s._fameLevelObject.getMaxLevel(), 999);
      assert.strictEqual(s._fameLevelObject.getLevel(), 1);
      assert.strictEqual(s._fameLevelObject.getExp(), 0);
    });

    it('exp table', function() {
      let s = new PlayerStore();
      let beforeNecessaryExp = 0;
      _.range(
        s._fameLevelObject.getMinLevel() + 1,
        s._fameLevelObject.getMaxLevel() + 1
      ).forEach((level) => {
        let necessaryExp = s._fameLevelObject.getNecessaryExpByLevel(level);
        assert(necessaryExp > beforeNecessaryExp, '必要経験値が前レベルより高い');
        beforeNecessaryExp = necessaryExp;
      });
    });
  });


  context('store and restore', function() {

    it('should be', function() {
      let s = new PlayerStore();
      assert.strictEqual(s._fameLevelObject.getExp(), 0);
      s.gainFameExp(9999);
      return s.store()
        .then(() => {
          let s2 = new PlayerStore();
          assert.strictEqual(s2._fameLevelObject.getExp(), 0);
          return s2.restore().then(() => {
            assert.strictEqual(s2._fameLevelObject.getExp(), 9999);
          });
        })
      ;
    });
  });
});
