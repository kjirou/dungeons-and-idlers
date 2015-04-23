import _ from 'lodash';


export function within(num, minNum, maxNum) {
  return Math.min(Math.max(num, minNum), maxNum);
}

/**
 * 配列を指定したプロパティの値で辞書化する
 * @param {string} propertyName キーにする値のプロパティ名
 * @return {object}
 */
export function dictionarize(list, propertyName) {
  let dict = {};
  list.forEach((v) => {
    dict[v[propertyName]] = v;
  });
  return dict;
}

/**
 * 辞書をキーを含んだ配列へ複製・変換する
 * @param {string} propertyName 元のキーを格納するプロパティ名
 * @return {Array}
 */
export function listize(dict, propertyName) {
  return Object.keys(dict).map((key) => {
    let data = _.cloneDeep(dict[key]);
    data[propertyName] = key;
    return data;
  });
}

/**
 * e.g.
 *   (10, 0, 1)  -> 1
 *   (10, 3, 5)  -> 8
 *   (10, 5, 7)  -> 2
 *   (10, 0, -1) -> 9
 *   (0, *, *)   -> -1
 */
export function rotateIndex(length, baseIndex, relativeIndex) {
  if (length === 0) return -1;
  return (baseIndex + relativeIndex + length) % length;
}

export function createCounter(start = 1) {
  start -= 1;
  return () => {
    return start += 1;
  };
}
