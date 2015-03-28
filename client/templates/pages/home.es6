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
        <table className='village_states'>
          <tr className='fame'>
            <th>Fame</th>
            <td className='value'>999</td>
            <td className='unit'>lv</td>
            <td className='others'></td>
          </tr>
          <tr className='money'>
            <th>Money</th>
            <td className='value'>999,999</td>
            <td className='unit'>gp</td>
            <td className='others'></td>
          </tr>
          <tr className='adventurers'>
            <th>Adventurers</th>
            <td className='value'><span className='current'>50</span><span className='separator'>/</span><span className='max'>50</span></td>
            <td className='unit'>people</td>
            <td className='others'>
              <div className='upgrade_button'>Upgrade</div>
            </td>
          </tr>
          <tr className='visit_interval'>
            <th>Visit Interval</th>
            <td className='value'>4.25</td>
            <td className='unit'>hours</td>
            <td className='others'>
              <div className='upgrade_button'>Upgrade</div>
            </td>
          </tr>
          <tr className='shop'>
            <th>Shop</th>
            <td className='value'>99</td>
            <td className='unit'>lv</td>
            <td className='others'>
              <div className='upgrade_button'>Upgrade</div>
            </td>
          </tr>
        </table>
      </div>
    {/*
      <div className='inner_page'>
        <div className='start_game-button' onMouseDown={onMouseDownStartGame}>Start Game</div>
      </div>
    */}
    </div>
  );
}
