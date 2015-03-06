import assert from 'assert'
import _ from 'lodash'

import SingletonMixin from 'client/mixins/singleton'


describe('client/mixins/singleton module', () => {

  it('module definition', () => {
    assert.strictEqual(typeof SingletonMixin, 'object');
  });

  it('getInstance, clearInstance', () => {
    class Foo {
      constructor(x, y) {
        this.data = {
          x: x,
          y: y
        };
      }
    }
    _.assign(Foo, SingletonMixin);

    let foo = Foo.getInstance(1, 2);
    assert.deepEqual(foo.data, { x: 1, y: 2 });
    let foo2 = Foo.getInstance();
    assert(foo === foo2);

    Foo.clearInstance();
    let foo3 = Foo.getInstance(2, 3);
    assert(foo !== foo3);
    assert.deepEqual(foo3.data, { x: 2, y: 3 });
  });
});
