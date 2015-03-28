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
        <div className='left-side side'>
          <h2>Village</h2>
          <table className='village'>
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
            <tr className='shop'>
              <th>Shop</th>
              <td className='value'>99</td>
              <td className='unit'>lv</td>
              <td className='others'>
                <div className='upgrade_button'>Upgrade</div>
              </td>
            </tr>
            <tr className='dungeons'>
              <th>Dungeons</th>
              <td className='value'><span className='current'>32</span><span className='separator'>/</span><span className='max'>32</span></td>
              <td className='unit'></td>
              <td className='others'>
                <div className='upgrade_button'>Upgrade</div>
              </td>
            </tr>
            <tr className='adventurers'>
              <th>Adventurers</th>
              <td className='value'><span className='current'>99</span><span className='separator'>/</span><span className='max'>99</span></td>
              <td className='unit'></td>
              <td className='others'>
                <div className='upgrade_button'>Upgrade</div>
              </td>
            </tr>
          </table>
        </div>
        <div className='right-side side'>
          <h2>Visitors</h2>
          <ul className='visitors'>
          {
            [
              ['Fighter'],
              ['Mage'],
              ['Priest'],
              ['Ranger'],
              ['Thief']
            ].map(([ label ], idx) => {
              return (
                <li>
                  <div className='icon invalid-symbol-bg_img'></div>
                  <div className='detail'>
                    <div className='row-1 row'>{label}</div>
                    <div className='row-2 row'><span className='current'>99:59:59</span><span className='separator'>/</span><span className='max'>80:00:00</span></div>
                  </div>
                </li>
              );
            })
          }
          </ul>
        </div>
      </div>
    {/*
      <div className='inner_page'>
        <div className='start_game-button' onMouseDown={onMouseDownStartGame}>Start Game</div>
      </div>
    */}
    </div>
  );
}
