import assert from 'assert';
import _ from 'lodash';

import {routeList, routes, stageList, stages} from 'client/lib/stages';


describe('client/lib/stages module', function() {

  it('routeList', function() {
    assert(Array.isArray(routeList));
    assert(routeList.length > 0);
  });

  it('routes', function() {
    assert.strictEqual(typeof routes, 'object');
    assert(_.size(routes) > 0);
    assert('undefined' in routes === false, 'typeId設定漏れがない');
  });

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
    });
  });
});
