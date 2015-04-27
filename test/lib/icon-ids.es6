import assert from 'assert';
import _ from 'lodash';

import {ICON_IDS} from 'lib/icon-ids';


describe('client/lib/icon-ids module', function() {

  it('ICON_IDS', function() {
    assert(ICON_IDS.length > 0);
    assert.strictEqual(ICON_IDS.length, _.unique(ICON_IDS).length, 'icon-idが重複していない');
  });
});
