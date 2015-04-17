import assert from 'assert';
import _ from 'lodash';

import Job from 'client/lib/jobs/job';


describe('client/lib/jobs/job module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Job, 'object');
  });

  it('extension', function() {
    let FooJob = _.assign({}, Job, {
      typeId: 'foo',
      _physicalAttackPower: 2
    });

    assert.strictEqual(FooJob.getName(), 'Foo');
    assert.strictEqual(FooJob.getPhysicalAttackPower(), 2);
    assert.strictEqual(FooJob.getMagicalAttackPower(), 0);

    FooJob._name = 'FOOO';
    assert.strictEqual(FooJob.getName(), 'FOOO');
  });
});
