import assert from 'assert';
import _ from 'lodash';

import StageFolder from 'client/lib/stages/stage-folder';


describe('client/lib/stages/stage-folder module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof StageFolder, 'object');
    StageFolder.toCardComponentProps();  // 少なくともエラーにならない
  });
});
