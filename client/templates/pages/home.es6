import React from 'react';


export default function homePageTemplate({
  className,
  style,
  navigationBar,
  onMouseDownStartGame
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <h2>HOME PAGE</h2>
        <div className='start_game-button' onMouseDown={onMouseDownStartGame}>Start Game</div>
      </div>
    </div>
  );
}
