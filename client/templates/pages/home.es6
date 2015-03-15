import React from 'react';


export default function homePageTemplate({
  className,
  style,
  navigationBar
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <h2>HOME PAGE</h2>
      </div>
    </div>
  );
}
