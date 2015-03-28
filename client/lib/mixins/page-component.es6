import React from 'react';


export default {

  propTypes: {
    isActive: React.PropTypes.bool.isRequired
  },

  createDefaultStyles: function createDefaultStyles() {
    return {
      display: this.props.isActive ? 'block' : 'none'
    };
  }
}
