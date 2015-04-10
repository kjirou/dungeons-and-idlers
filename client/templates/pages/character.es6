import _ from 'lodash';
import React from 'react';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  charactersStore
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
      {
        charactersStore.characters.map((characterStore, idx) => {
          let key = 'character-' + idx;
          let style = {
            top: 48 + (48 + 128) * ~~(idx / 6),
            left: 32 + (32 + 96) * (idx % 6)
          };
          return (
            <div className='character' key={key} style={style}>
              <h3>{characterStore.getName()}</h3>
              <CardComponent {...{
                top: 20,
                isFace: true,
                isClickable: true,
                cardBodyType: 'creature',
                cardBodyProps: _.assign(
                  _.pick(characterStore, 'hp', 'maxHp', 'physicalAttackPower', 'attacks', 'feats'),
                  {
                    subActionName: '--'
                  }
                )
              }}/>
            </div>
          );
        })
      }
      </div>
    </div>
  );
}
