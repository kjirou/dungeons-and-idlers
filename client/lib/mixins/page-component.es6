import React from 'react';


let PageComponentMixin = {

  propTypes: {
    isActive: React.PropTypes.bool.isRequired
  },

  createDefaultStyles: function createDefaultStyles() {
    return {
      display: this.props.isActive ? 'block' : 'none'
    };
  }
};


export default PageComponentMixin;
