import React from 'react';

import CardIconComponent from 'client/components/partials/card-icon';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'HandCardsComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left
    };

    let handCards = [
      { iconClassName: 'sword-icon-image', title: '' },
      { iconClassName: 'heart-icon-image', title: '' },
      { iconClassName: 'key-icon-image', title: '' },
      { iconClassName: 'shield-icon-image', title: '' }
    ];

    return (
      <div className={createComponentClassName('hand_cards')} style={style}>
        {
          handCards.map((handCard, handCardIndex) => {
            let props = {
              top: ~~(handCardIndex / 3) * 32,
              left: handCardIndex % 3 * 32,
              iconClassName: handCard.iconClassName,
              title: handCard.title
            };
            return <CardIconComponent {...props} />
          })
        }

        <div className='open_button'>Open</div>

      </div>
    );
  }
});
