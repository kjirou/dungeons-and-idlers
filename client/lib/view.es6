import _ from 'lodash';
import React from 'react';

import {MODULE_TEMPLATES_ROOT} from 'client/constants';
import {ICON_IDS} from 'lib/icon-ids';


// pre-reading templates for browserify
if (false) {
  require('client/templates/pages/card');
  require('client/templates/pages/character');
  require('client/templates/pages/equipment');
  require('client/templates/pages/game');
  require('client/templates/pages/home');
  require('client/templates/pages/welcome');
}


/**
 * 枠divに設定するclass名を生成する
 * e.g. ('foo')        -> 'component foo-component'
 *      ('foo', 'bar') -> 'component foo-component bar-foo-component'
 */
export function createComponentClassName(...partialClassNames) {
  partialClassNames.unshift('component');
  return partialClassNames
    .map((v, i) => { return partialClassNames.slice(0, i + 1).reverse(); })
    .map(v => { return v.join('-'); })
    .join(' ')
  ;
}

export const createPageComponentClassName = _.partial(createComponentClassName, 'page');

/**
 * JSXコンパイラを返す
 *
 * React内に同じようなメソッドが見つからなく、react-jadeも動かなかったので
 * 後で何か方法が見つかった時のために、APIだけ定義しておく
 *
 * 複雑になったら JS 内での React.DOM ベタ書きにする
 * 特に props を多数渡す必要がある Component を持つ時など
 */
export function createJsxFileCompiler(modulePath) {
  return require(modulePath);
}

export function compileJsxFile(modulePath, locals = {}) {
  return createJsxFileCompiler(modulePath)(locals);
}

export function compileJsxTemplate(templatePath, locals = {}) {
  return compileJsxFile(MODULE_TEMPLATES_ROOT + '/' + templatePath, locals);
}

export function getIconClassName(iconId) {
  if (ICON_IDS.indexOf(iconId) > -1) {
    return iconId + '-icon-image';
  } else {
    return null;
  }
}

export function getIconClassNameOrError(iconId) {
  let className = getIconClassName(iconId);
  if (!className) {
    throw new Error('Invalid iconId');
  }
  return className;
}

export function isIconId(iconId) {
  return !!getIconClassName(iconId);
}

export function createSelectField(props, optionList) {
  return <select {...props}>
  {
    optionList.map(({ value, label }, i) => {
      return <option key={'option-' + i} value={value}>{label}</option>
    })
  }
  </select>;
}
