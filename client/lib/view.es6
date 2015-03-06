import _ from 'lodash'


/**
 * 枠divに設定するclass名を生成する
 * e.g. ('foo')        -> 'view foo-view'
 *      ('foo', 'bar') -> 'view foo-view bar-foo-view'
 */
export function createClassName(...partialClassNames) {
  partialClassNames.unshift('view');
  return partialClassNames
    .map((v, i) => { return partialClassNames.slice(0, i + 1).reverse(); })
    .map(v => { return v.join('-'); })
    .join(' ')
  ;
}

export const createPageClassName = _.partial(createClassName, 'page');
