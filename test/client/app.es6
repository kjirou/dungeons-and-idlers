import React from 'react';

import App from 'client/app';


describe('client/app module', function() {

  it('should be able to render', function() {
    let app = new App();
    React.renderToString(app._rootElement);
  });
});
