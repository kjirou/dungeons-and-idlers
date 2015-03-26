import assert from 'assert';
import _ from 'lodash';

import {jobs} from 'client/lib/jobs';


describe('client/lib/jobs module', function() {

  context('jobs', function() {

    it('should be', function() {
      assert.strictEqual(typeof jobs, 'object');
      assert(_.size(jobs) > 0);
      assert('undefined' in jobs === false);
    });
  });
});
