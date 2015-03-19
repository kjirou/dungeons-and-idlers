import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'CardComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    isFace: React.PropTypes.bool,
    isClickable: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      top: 0,
      left: 0,
      isFace: false,
      isClickable: false
    };
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      cursor: this.props.isClickable ? 'pointer' : 'default'
    };

    return (
      <div className={createComponentClassName('card')} style={style}>
        <div className='face' style={{ display: this.props.isFace ? 'block' : 'none' }}>
          <div className='icon minotaur-monster-bg_img'></div>
        </div>
        <div className='back' style={{ display: this.props.isFace ? 'none' : 'block' }}></div>
      </div>
    );
  }
});
