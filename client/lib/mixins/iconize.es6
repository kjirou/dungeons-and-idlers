import {getIconClassNameOrError, isIconId} from 'client/lib/view';


let IconizeMixin = {

  _iconId: null,

  /**
   * オブジェクト情報からアイコンIDを推測する
   * @return {string}
   */
  _guessIconId() {
    if (this.typeId && isIconId(this.typeId)) {
      return this.typeId;
    }
    return 'invalid';
  },

  getIconId() {
    return this._iconId || this._guessIconId();
  },

  getIconClassName() {
    return getIconClassNameOrError(this.getIconId());
  }
};


export default IconizeMixin;
