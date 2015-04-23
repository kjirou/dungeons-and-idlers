import assert from 'assert';
import _ from 'lodash';
import pathModule from 'path';
import React from 'react';

import {compileJsxFile, createComponentClassName, createPageComponentClassName,
  getIconClassName, getIconClassNameOrError, ICON_IDS,
  isIconId} from 'client/lib/view';
import conf from 'conf';


describe('client/lib/view module', function() {

  it('createComponentClassName', function() {
    assert.strictEqual(createComponentClassName(), 'component');
    assert.strictEqual(createComponentClassName('foo'), 'component foo-component');
    assert.strictEqual(createComponentClassName('foo', 'bar'), 'component foo-component bar-foo-component');
  });

  it('createPageComponentClassName', function() {
    assert.strictEqual(createPageComponentClassName(), 'component page-component');
    assert.strictEqual(createPageComponentClassName('foo'), 'component page-component foo-page-component');
  });

  it('compileJsxFile', function() {
    let ChildComponent = React.createClass({
      render: function() {
        return <div style={{width: this.props.propToWidth}}>It is foo page</div>;
      }
    });

    let locals = {
      className: 'foo',
      style: {
        color: 'red'
      },
      title: 'Foo Page',
      child: {
        ChildComponent: ChildComponent,
        propToWidth: 999
      }
    };

    let el = compileJsxFile(pathModule.join(conf.root, 'test/support/foo.jsx.es6'), locals);
    let html = React.renderToString(el);

    assert(/class="foo"/.test(html));
    assert(/color:red/.test(html));
    assert(/Foo Page/.test(html));
    assert(/999px/.test(html));
    assert(/It is foo page/.test(html));
  });

  it('ICON_IDS', function() {
    assert.strictEqual(ICON_IDS.length, _.unique(ICON_IDS).length);
  });

  it('getIconClassName, getIconClassNameOrError, isIconId', function() {
    assert.strictEqual(getIconClassName('fighter'), 'fighter-icon-image');
    assert.strictEqual(getIconClassName('not_exist'), null);
    assert.strictEqual(getIconClassNameOrError('fighter'), 'fighter-icon-image');
    assert.throws(() => {
      getIconClassNameOrError('not_exist');
    });
    assert(isIconId('fighter'));
    assert(!isIconId('not_exist'));
  });
});
