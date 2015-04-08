/**
 * 設定値及び環境設定ファイル
 *
 * 書き換えたい場合は、最初にこれだけ読み込んで上書き
 */
let isNode = typeof exports === 'object' && typeof module === 'object';
let env = isNode ? process.env.NODE_ENV : 'client';

export default {
  isNode,
  env
};
