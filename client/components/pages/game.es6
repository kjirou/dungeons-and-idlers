import _ from 'lodash';
import React from 'react';

import CardComponent from 'client/components/partials/card';
import CardHolderComponent from 'client/components/partials/card-holder';
import HandCardsComponent from 'client/components/partials/hand-cards';
import InventoryComponent from 'client/components/partials/inventory';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'GamePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render() {
    let style = this.createDefaultStyles();

    let cardStores = [
      { top: 24, left: 24, isFace: true },
      { top: 24, left: 24 + 112, isFace: true },
      { top: 24, left: 24 + 112 * 2 },
      { top: 24, left: 24 + 112 * 3 },
      { top: 24, left: 24 + 112 * 4 },
      { top: 24, left: 24 + 112 * 5 },

      { top: 24 + 160 + 16, left: 24, isFace: true, isClickable: true },
      { top: 24 + 160 + 16, left: 24 + 112, isFace: true, isClickable: true },
      { top: 24 + 160 + 16, left: 24 + 112 * 2, isFace: true, isClickable: true },
      { top: 24 + 160 + 16, left: 24 + 112 * 3, isFace: true, isClickable: true }
    ];

    // top = 32 + (128 + 32 + 8) * 2
    let characters = [
      { handCards: { top: 376, left: 24 } },
      { handCards: { top: 376, left: 24 + 112 } },
      { handCards: { top: 376, left: 24 + 112 * 2 } },
      { handCards: { top: 376, left: 24 + 112 * 3 } }
    ];

    return (
      <div className={createPageComponentClassName('game')} style={style}>

        <InventoryComponent />

        <div className='dungeon_card_counter'>
          <span className='count'>44</span>
          <span className='separator'>/</span>
          <span className='max_count'>50</span>
        </div>

        {
          cardStores.map((cardStore, cardIndex) => {
            let cardHolderPropKeys = ['top', 'left', 'isHidden'];
            let cardProps = _.omit(cardStore, ...cardHolderPropKeys);
            let cardHolderProps = _.assign(_.pick(cardStore, ...cardHolderPropKeys), {
              cardProps: cardProps
            });
            if (cardStore.isHidden) cardHolderProps.isHidden = cardStore.isHidden;

            return <CardHolderComponent
              key={'card_holder-' + cardIndex}
              {...cardHolderProps}
            />;
          })
        }

        {
          characters.map((character, characterIndex) => {
            let key = 'hand_cards-' + characterIndex;
            let props = {
              key,
              top: character.handCards.top,
              left: character.handCards.left
            };
            return <HandCardsComponent {...props} />
          })
        }

      </div>
    );
  }
});
