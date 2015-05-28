import _ from 'lodash';
import React from 'react';

import CardComponent from 'client/components/partials/card';
import NavigationBarComponent from 'client/components/partials/navigation-bar';
import ComponentMixin from 'client/lib/mixins/component';


export default function cardPageTemplate({
  className,
  style,
  cards,
  searchSelectElement,
  sortSelectElement
}) {
  return (
    <div className={className} style={style}>
      <NavigationBarComponent/>
      <div className='inner_page'>
        <div className='controller'>
          {searchSelectElement}
          {sortSelectElement}
        </div>
        <div className='cards'>
        {
          cards.map((card, cardIndex) => {
            return <div className='card_container' key={'card-' + cardIndex}>
              <CardComponent {...(card.equipment.toCardComponentProps())}/>
              <div className='card_count'>
                <span className='operator'>x</span>
                <span className='value'>{card.count}</span>
              </div>
            </div>;
          })
        }
        </div>
      </div>
    </div>
  );
}
