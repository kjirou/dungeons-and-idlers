import assert from 'assert';
import _ from 'lodash';

import {skillList, skills} from 'client/lib/skills';


describe('client/lib/skills module', function() {

  it('skillList', function() {
    assert(Array.isArray(skillList));
    assert(skillList.length > 0);
    console.log(skillList[0].serialNumber);
    console.log(skillList[5].serialNumber);
  });

  it('skills', function() {
    assert.strictEqual(typeof skills, 'object');
    assert(_.size(skills) > 0);
    assert('undefined' in skills === false);
  });
});