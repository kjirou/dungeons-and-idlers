import assert from 'assert';
import _ from 'lodash';
import pathModule from 'path';
import React from 'react';

import {compileJsxFile, createComponentClassName, createPageComponentClassName,
  createSelectField, getIconClassName, getIconClassNameOrError, isIconId} from 'client/lib/view';
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

  it('createSelectField', function() {
    let selectBox = createSelectField({ value: 'bar' }, [
      { value: 'foo', label: 'Foo'}, { value: 'bar', label: 'BAR' }
    ]);
    let html = React.renderToStaticMarkup(selectBox);
    assert.strictEqual(html, '<select><option value="foo">Foo</option><option value="bar">BAR</option></select>');
  });
});
