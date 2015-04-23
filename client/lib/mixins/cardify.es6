let CardifyMixin = {

  _isFace: true,

  isFace() {
    return this._isFace;
  },

  isBack() {
    return !this.isFace();
  },

  /**
   * CardComponent へ渡す props へ変換する
   * @return {object}
   */
  toCardComponentProps() {
    throw new Error('Not Implemented');
  }
};


export default CardifyMixin;
