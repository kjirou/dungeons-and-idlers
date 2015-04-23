import _ from 'lodash';
import React from 'react';


export default function cardPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  cards,
  searchSelectElement,
  sortSelectElement
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='controller'>
          {searchSelectElement}
          {sortSelectElement}
        </div>
        <div className='cards'>
        {
          cards.map((card, cardIndex) => {
            return <div className='card_container' key={'card-' + cardIndex}>
              <CardComponent {...(card.skill.toCardComponentProps())}/>
            </div>;
          })
        }
        </div>
      </div>
    </div>
  );
}
