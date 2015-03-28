let NamingMixin = {

  _name: null,
  getName() {
    return this._name;
  },

  _shortName: null,
  getShortName() {
    return this._shortName || this.getName();
  },

  _abbreviation: null,
  getAbbreviation() {
    return this._abbreviation || this.getShortName();
  }
};


export default NamingMixin;
