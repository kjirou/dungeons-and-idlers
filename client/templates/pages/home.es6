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
              <div className='image gate-paint-bg_img'></div>
              <div className='detail'>
                <div className='title'>Visitor</div>
                <div className='description'>
                  来訪する冒険者の受け入れを行います<br/>
                  新規開拓や来訪者数向上などの施策もできます
                </div>
              </div>
            </li>
            <li>
              <div className='image bar-paint-bg_img'></div>
              <div className='detail'>
                <div className='title'>Party</div>
                <div className='description'>
                  冒険者同士を引き合わせパーティ編成をします<br/>
                  カードの装備もここで行います
                </div>
              </div>
            </li>
            <li>
              <div className='image library-paint-bg_img'></div>
              <div className='detail'>
                <div className='title'>Card</div>
                <div className='description'>
                  所持しているカードの一覧です
                </div>
              </div>
            </li>
            <li>
              <div className='image shop-paint-bg_img'></div>
              <div className='detail'>
                <div className='title'>Shop</div>
                <div className='description'>
                  カードを購入できるお店です<br/>
                  商品は時間経過で更新されます
                </div>
              </div>
            </li>
            <li>
              <div className='image dungeon-paint-bg_img' onMouseDown={onMouseDownStartGame}></div>
              <div className='detail'>
                <div className='title'>Dungeon</div>
                <div className='description'>
                  ダンジョンへ向かいます<br/>
                  事前にパーティ編成が必要です
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
