import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'BuffComponent',
  mixins: [ComponentMixin],

  propTypes: {
    left: React.PropTypes.number.isRequired,
    buffType: React.PropTypes.string.isRequired,
    duration: React.PropTypes.number.isRequired
  },

  render() {
    let className = [
      createComponentClassName('buff'),
      this.props.buffType + '-bg_img'
    ].join(' ');

    let style = {
      top: this.props.top,
      left: this.props.left
    };

    return (
      <div className={className} style={style}></div>
    );
  }
});
