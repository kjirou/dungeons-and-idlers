import assert from 'assert';
import _ from 'lodash';

import Skill from 'client/lib/skills/skill';


describe('client/lib/skills/skill module', function() {

  it('module definition', function() {
    assert.strictEqual(typeof Skill, 'object');
  });


  context('sub skill definition', function() {

    it('should be', function() {
      let SubSkill = _.assign({}, Skill, {
        typeId: 'sub',
        _summary: 'it is sub skill'
      });
      assert.strictEqual(SubSkill.getSummary(), 'it is sub skill');
      assert.strictEqual(SubSkill.toCardComponentProps().cardBodyProps.iconClassName, 'invalid-icon-image');
    });
  });
});
