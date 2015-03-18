import _ from 'lodash';
import React from 'react';

import CardComponent from 'client/components/partials/card';
import CardHolderComponent from 'client/components/partials/card-holder';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'GamePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render() {
    let style = this.createDefaultStyles();

    let cardStores = [
      { top: 32, left: 32 },
      { top: 32, left: 32 + 128 },
      { top: 32, left: 32 + 128 * 2 },
      { top: 32, left: 32 + 128 * 3 },
      { top: 32, left: 32 + 128 * 4 },
      { top: 32, left: 32 + 128 * 5 },

      { top: 32 + 160 + 16, left: 32 },
      { top: 32 + 160 + 16, left: 32 + 128 },
      { top: 32 + 160 + 16, left: 32 + 128 * 2 },
      { top: 32 + 160 + 16, left: 32 + 128 * 3 }
    ];

    return (
      <div className={createPageComponentClassName('game')} style={style}>
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
      </div>
    );
  }
});
