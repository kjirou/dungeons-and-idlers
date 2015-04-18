import _ from 'lodash';
import React from 'react';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  charactersStore,
  onMouseDownCharacter
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
      {
        charactersStore.characters.map((characterStore, idx) => {
          let props = {
            key: 'character-' + idx,
            style: {
              top: 48 + (48 + 128) * ~~(idx / 6),
              left: 32 + (32 + 96) * (idx % 6)
            },
            onMouseDown() {
              onMouseDownCharacter(idx);
            }
          };

          let cardProps = _.assign({}, characterStore.toCardComponentProps(), {
            top: 20,
            isClickable: true
          });

          return (
            <div className='character' {...props}>
              <h3>{characterStore.getName()}</h3>
              <CardComponent {...cardProps}/>
            </div>
          );
        })
      }
      </div>
    </div>
  );
}
