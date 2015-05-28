import _ from 'lodash';
import React from 'react';

import NavigationBarComponent from 'client/components/partials/navigation-bar';


export default function dungeonPageTemplate({
  className,
  style,
  state
}) {
  return (
    <div className={className} style={style}>
      <NavigationBarComponent/>
      <div className='inner_page'>
        <h1>Dungeon Page</h1>
      </div>
    </div>
  );
}
