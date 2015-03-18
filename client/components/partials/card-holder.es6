import React from 'react';

import CardComponent from 'client/components/partials/card';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'CardHolderComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    cardProps: React.PropTypes.object.isRequired,
    isHidden: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      isHidden: false
    };
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      display: this.props.isHidden ? 'none' : 'block'
    };

    return (
      <div className={createComponentClassName('card_holder')} style={style}>
        <CardComponent {...this.props.cardProps} />
      </div>
    );
  }
});
