import React from 'react';


export default function homePageTemplate({
  className,
  style,
  navigationBar,
  createOnMouseDownPageChangeButton
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>

        <div className='left-side side'>
          <h2>Village Information</h2>
          <table className='village_information'>
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
          <ul className='links'>
            <li>
              <div className='image bar-paint-bg_img' onMouseDown={createOnMouseDownPageChangeButton('character')}/>
              <div className='detail'>
                <div className='title'>Character</div>
                <div className='description'>
                  冒険者の装備を整えます<br/>
                </div>
              </div>
            </li>
            <li>
              <div className='image library-paint-bg_img' onMouseDown={createOnMouseDownPageChangeButton('card')}/>
              <div className='detail'>
                <div className='title'>Card</div>
                <div className='description'>
                  所持しているカードの一覧です
                </div>
              </div>
            </li>
            <li>
              <div className='image dungeon-paint-bg_img' onMouseDown={createOnMouseDownPageChangeButton('game')}/>
              <div className='detail'>
                <div className='title'>Dungeon</div>
                <div className='description'>
                  ダンジョンへ向かいます
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
