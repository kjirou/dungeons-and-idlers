import assert from 'assert';
import React from 'react';

import App from 'client/app';


describe('client/app module', function() {

  afterEach(function() {
    delete App._env;
  });

  it('should be able to render', function() {
    let app = new App();
    React.renderToString(app._rootElement);
  });

  it('isNode', function() {
    if (typeof window === 'object') {
      assert(!App.isNode());
    } else {
      assert(App.isNode());
    }
  });

  it('getEnv, setEnv', function() {
    if (App.isNode()) {
      assert.strictEqual(App.getEnv(), 'test');
    } else {
      assert.strictEqual(App.getEnv(), 'client');
    }
    App.setEnv('foo');
    assert.strictEqual(App.getEnv(), 'foo');
  });
});
