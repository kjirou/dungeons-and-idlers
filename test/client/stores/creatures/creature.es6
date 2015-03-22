import assert from 'assert';

import CreatureStore from 'client/stores/creatures/creature';


describe('client/stores/creatures/creature module', function() {

  context('class definition', function() {

    it('class props', function() {
      assert('MIN_MAX_HP' in CreatureStore);
      assert(CreatureStore.MIN_MAX_HP, 1);
    });
  });
});
