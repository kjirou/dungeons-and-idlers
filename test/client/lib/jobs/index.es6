import assert from 'assert';
import _ from 'lodash';

import {jobList, jobs, playableJobList} from 'client/lib/jobs';


describe('client/lib/jobs module', function() {

  it('jobList, playableJobList', function() {
    assert(Array.isArray(jobList));
    assert(jobList.length > 0);
    assert(playableJobList.length > 0);
    assert(jobList.length > playableJobList.length);
  });

  it('jobs', function() {
    assert.strictEqual(typeof jobs, 'object');
    assert(_.size(jobs) > 0);
    assert('undefined' in jobs === false);
  });
});
