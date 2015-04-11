import assert from 'assert';
import _ from 'lodash';
import sinon from 'sinon';

import {DummyJob, FighterJob} from 'client/lib/jobs';
import Job from 'client/lib/jobs/job';
import CharacterStore from 'client/stores/creatures/character';


describe('client/stores/creatures/character module', function() {

  before(function() {
    this.mocks = [];
  });

  afterEach(function() {
    this.mocks.forEach(function(mock) { mock.restore(); });
    this.mocks = [];
  });

  context('constructor', function() {

    it('constructor', function() {
      let c = new CharacterStore();
      assert(c instanceof CharacterStore);
    });
  });

  context('properties', function() {

    it('name', function() {
      let c = new CharacterStore();
      assert.strictEqual(c.name, 'Dummy');
      c._name = 'Foo';
      assert.strictEqual(c.name, 'Foo');
      c.set('name', 'Bar');
      assert.strictEqual(c.name, 'Bar');
    });

    it('job', function() {
      let c;
      c = new CharacterStore();
      assert.strictEqual(c.job, DummyJob);
      c = new CharacterStore({ jobTypeId: 'fighter' });
      assert.strictEqual(c.job, FighterJob);
    });

    it('maxHp, physicalAttackPower, magicalAttackPower', function() {
      // 数値であることと、前の値より高くなっていることだけを確認
      [
        'maxHp',
        'physicalAttackPower',
        'magicalAttackPower'
      ].forEach(function(propName) {
        let c = new CharacterStore();
        let beforeValue = c[propName];

        let TestJob = _.assign({}, Job);
        TestJob[propName] = DummyJob[propName] + 99;
        sinon.stub(c, '_getJob', () => { return TestJob; });

        assert.strictEqual(typeof c[propName], 'number');
        assert(beforeValue < c[propName]);
      });
    });

    it('_getAttacks', function() {
      // TODO: Attackクラス実装後にテスト補充
      let c;
      c = new CharacterStore();
      assert.strictEqual(c._getAttacks().length, 3)
    });
  });
});
