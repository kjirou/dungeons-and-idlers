import assert from 'assert';

import GameStore from 'client/stores/game';


describe('client/stores/game module', function() {

  context('constructor', function() {

    it('should be', function() {
      let c = new GameStore();
      assert(c instanceof GameStore);
    });
  });
});
