import assert from 'assert'

import Store from 'client/stores/store'


describe('client/stores/store module', () => {

  it('module definition', () => {
    assert.strictEqual(typeof Store, 'function');
  });

  it('create a instance', () => {
    let store = new Store();
    assert(store instanceof Store);
  });

  it('propGetter', () => {
    let FooStore = Store.extend({
      initialize: function() {
        this._x = 1;
        this.y = 2;

        this.propGetter('x');
        this.propGetter('yGetter', 'y');
      }
    });

    let foo = new FooStore();
    assert.strictEqual(foo.x, 1);
    assert.strictEqual(foo.yGetter, 2);
  });

  it('attrGetter', () => {
    let FooStore = Store.extend({
      defaults: function() {
        return {
          x: 1,
          y: 2
        };
      },
      initialize: function() {
        this.attrGetter('x');
        this.attrGetter('yGetter', 'y');
      }
    });

    let foo = new FooStore();
    assert.strictEqual(foo.x, 1);
    assert.strictEqual(foo.yGetter, 2);
  });


  context('inheritance', () => {

    it('should be', () => {
      let FooStore = Store.extend({
        defaults: () => { return { x:1, y:2 }; }
      });

      assert(FooStore.prototype instanceof Store);
      assert('getInstance' in FooStore);

      let foo = new FooStore();
      assert.deepEqual(foo.attributes, {
        x: 1,
        y: 2
      });
      assert('propGetter' in foo);
    });

    it('should not break singleton', () => {
      let FooStore = Store.extend();
      let BarStore = Store.extend();

      let foo = FooStore.getInstance();
      let foo2 = FooStore.getInstance();
      let bar = BarStore.getInstance();
      let bar2 = BarStore.getInstance();

      assert.strictEqual(foo, foo2);
      assert.strictEqual(bar, bar2);
      assert.notStrictEqual(foo, bar);

      FooStore.clearInstance();
      assert.strictEqual(FooStore._instance, null);
      assert.strictEqual(BarStore._instance, bar);
    });
  });
});
