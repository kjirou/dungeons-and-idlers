import assert from 'assert';
import React from 'react';

import ComponentMixin from 'client/lib/mixins/component';
import Store from 'client/stores/store';


describe('client/lib/mixins/component module', function() {

  it('pipeStoreAttributeToState', function() {
    let store = new (Store.extend({
      defaults: {
        foo: 'initial'
      }
    }));

    let FooComponent = React.createClass({
      mixins: [ComponentMixin],
      getInitialState: function() {
        return { foo: store.get('foo') };
      },
      componentWillMount: function() {
        this.pipeStoreAttributeToState(store, 'foo');
      },
      render: function() {
        return React.DOM.div(null, this.state.foo);
      }
    });

    // state変化前後で出力のチェックをしたかったが、
    // renderToString 後に setState するとエラーになる仕様みたい
    let el = React.createElement(FooComponent);
    store.set('foo', 'changed');
    assert(/changed/.test(React.renderToString(el)));
  });
});
