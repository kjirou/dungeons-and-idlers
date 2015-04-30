import assert from 'assert';
import _ from 'lodash';

import Stage from 'client/lib/stages/stage';


describe('client/lib/stages/stage module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Stage, 'object');
    Stage.toCardComponentProps();  // 少なくともエラーにならない
  });
});
