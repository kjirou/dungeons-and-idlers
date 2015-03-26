export function within(num, minNum, maxNum) {
  return Math.min(Math.max(num, minNum), maxNum);
}

/**
 * 配列を指定したプロパティの値で辞書化する
 */
export function dictionarize(list, propertyName) {
  let dict = {};
  list.forEach((v) => {
    dict[v[propertyName]] = v;
  });
  return dict;
}
