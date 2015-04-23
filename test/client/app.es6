import assert from 'assert';
import _ from 'lodash';
import React from 'react';

import App from 'client/app';


describe('client/app module', function() {

  beforeEach(function() {
    App.clearStores();
  });

  it('should be created stores', function() {
    let app = new App();
    assert(_.size(app._stores) > 0);
  });

  it('should be able to render', function() {
    let app = new App();
    React.renderToStaticMarkup(app._rootElement);  // 少なくともエラーにならない
  });
});
