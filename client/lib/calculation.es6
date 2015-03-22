import _ from 'lodash';


export function sumPowers(powers) {
  return _.reduce(powers, (m, v) => {
    return m + v;
  }, 0);
};

export function sumRates(rates) {
  let rate = _.reduce(rates, (m, v) => {
    if (v < 0) {
      throw new Error(`${rates} is invalid rates`);
    }
    return m * v;
  }, 1.0);
  return Math.max(rate, 0.0);
};

/**
 * いずれかの確率に成功する確率を返す
 * マイナス値は順番が影響するからNG
 *
 * @example
 *   ([0.2, 0.3])
 *   = 1.0 - ((1.0 - 0.2) * (1.0 - 0.3))
 *   = 1.0 - 0.56 = 0.44
 */
export function sumChances(chances) {
  let exclusiveProb = _.reduce(chances, (m, v) => {
    if (v < 0 || v > 1.0) {
      throw new Error(`${chances} is invalid chances`);
    }
    return m * (1.0 - v);
  }, 1.0);
  return 1.0 - exclusiveProb;
};

export function sumIntegers(integers) {
  return _.reduce(integers, (m, v) => {
    return m + Math.floor(v);
  }, 0);
};

export function sumLists(lists) {
  return _.reduce(lists, (m, v) => {
    return m.concat(v);
  }, []);
};

export function sumParametersByType(parameterType, parameters) {
  let computer = {
    chance: sumChances,
    every: (list) => {
      return list.every((v) => { return v; });
    },
    integer: sumIntegers,
    list: sumLists,
    power: sumPowers,
    rate: sumRates,
    some: (list) => {
      return list.some((v) => { return v; });
    },
  }[parameterType];
  return computer(parameters);
};
