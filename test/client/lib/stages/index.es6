import assert from 'assert';
import _ from 'lodash';

import {stageList, stages} from 'client/lib/stages';


describe('client/lib/stages module', function() {

  //it('stageFolderList', function() {
  //  assert(Array.isArray(stageFolderList));
  //  assert(stageFolderList.length > 0);
  //});

  //it('stageFolders', function() {
  //  assert.strictEqual(typeof stages, 'object');
  //  assert(_.size(stageFolders) > 0);
  //  assert('undefined' in stageFolders === false);
  //});

  it('stageList', function() {
    assert(Array.isArray(stageList));
    assert(stageList.length > 0);
  });

  it('stages', function() {
    assert.strictEqual(typeof stages, 'object');
    assert(_.size(stages) > 0);
    assert('undefined' in stages === false, 'typeId設定漏れがない');
    Object.keys(stages).forEach((k) => {
      let stage = stages[k];
      assert.strictEqual(typeof stage, 'object', k + ' の内容がオブジェクト');
      //assert.strictEqual(typeof stage.folder, 'object', k + ' のfolderがオブジェクト');
    });
  });
});
