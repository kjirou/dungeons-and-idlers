import assert from 'assert';
import _ from 'lodash';

import Skill from 'client/lib/skills/skill';


describe('client/lib/skills/skill module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Skill, 'object');
  });

  //it('extension', function() {
  //  let FooJob = _.assign({}, Job, {
  //    typeId: 'foo',
  //    physicalAttackPower: 2
  //  });

  //  assert.strictEqual(FooJob.getName(), 'Foo');
  //  assert.strictEqual(FooJob.physicalAttackPower, 2);
  //  assert.strictEqual(FooJob.magicalAttackPower, 0);

  //  FooJob._name = 'FOOO';
  //  assert.strictEqual(FooJob.getName(), 'FOOO');
  //});
});
