import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'CardIconComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    // cardType だけだと、どのカテゴリ下にあるのか判別できないので
    // とりあえずはクラス名そのまま渡す
    iconClassName: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      display: this.props.isHidden ? 'none' : 'block'
    };
    let className = [
      createComponentClassName('card_icon'),
      this.props.iconClassName
    ].join(' ');

    return (
      <div className={className} style={style} />
    );
  }
});
