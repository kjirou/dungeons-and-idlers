import React from 'react'


export default {

  /**
   * 枠divに設定するclass名を生成する
   * e.g. ('foo')        -> 'view foo-view'
   *      ('foo', 'bar') -> 'view foo-view bar-foo-view'
   */
  createClassName: function createClassName(...partialClassNames) {
    partialClassNames.unshift('view');
    return partialClassNames
      .map((v, i) => { partialClassNames.slice(0, i + 1).reverse(); })
      .map(v => {v.join('-')})
      .join(' ')
    ;
  }
}
