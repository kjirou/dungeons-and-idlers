import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'CardComponent',
  mixins: [ComponentMixin],

  propTypes: {
    isHidden: React.PropTypes.bool.isRequired,
    isFace: React.PropTypes.bool.isRequired,
    isClickable: React.PropTypes.bool.isRequired,
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired
  },

  render() {
    let classNames = [
      createComponentClassName('card'),
      this.props.isFace ? 'face' : 'back'
    ];

    let style = {
      display: this.props.isHidden ? 'none' : 'block',
      cursor: this.props.isClickable ? 'pointer' : 'default',
      top: this.props.top,
      left: this.props.left
    };

    return (
      <div className={classNames.join(' ')} style={style}>
        <div className='icon'></div>
      </div>
    );
  }
});
