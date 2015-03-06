import _ from 'lodash'


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
