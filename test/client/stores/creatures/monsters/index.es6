import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';

import {monsters} from 'client/stores/creatures/monsters';


describe('client/stores/creatures/monsters module', function() {

  context('monsters', function() {

    it('should be', function() {
      assert.strictEqual(typeof monsters, 'object');
      assert(_.size(monsters) > 0);
      assert('undefined' in monsters === false);
    });
  });
});
