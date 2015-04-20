import _ from 'lodash';
import React from 'react';


export default function cardPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  cardsStore
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <h2>Card Page</h2>
      </div>
    </div>
  );
}
