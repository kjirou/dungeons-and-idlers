import _ from 'lodash';
import React from 'react';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  charactersStore,
  selectedCharacterName,
  selectedCharacterElement,
  onMouseDownCharacterName,
  onMouseDownNextCharacter,
  onMouseDownPrevCharacter
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='page_column left-page_column'>
          <div className='character_pagination'>
            <div className='part left-part' onMouseDown={onMouseDownPrevCharacter}>&lt;</div>
            <div className='part center-part' onMouseDown={onMouseDownCharacterName}>{selectedCharacterName}</div>
            <div className='part right-part' onMouseDown={onMouseDownNextCharacter}>&gt;</div>
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
