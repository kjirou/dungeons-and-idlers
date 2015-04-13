import _ from 'lodash';
import React from 'react';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  charactersStore,
  selectedCharacterName,
  selectedCharacterElement
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='page_column left-page_column'>
          <div className='character_pagination'>
            <div className='part left-part'>&lt;</div>
            <div className='part center-part'>{selectedCharacterName}</div>
            <div className='part right-part'>&gt;</div>
          </div>
          <div className='card_container'>
            {selectedCharacterElement}
          </div>
        </div>
        <div className='page_column right-page_column'></div>
      </div>
    </div>
  );
}
