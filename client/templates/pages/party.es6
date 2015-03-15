import React from 'react';


export default function partyPageTemplate({
  className,
  style,
  navigationBar
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <h2>PARTY PAGE</h2>
      </div>
    </div>
  );
}
