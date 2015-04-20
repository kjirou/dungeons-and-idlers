import _ from 'lodash';
import React from 'react';


export default function cardPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  cardsStore
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='controller'>
          <select className='search' value='all'>
            <option value='all'>全てのカード</option>
            <option value='sub_action'>サブアクション</option>
            <option value='skill'>スキル</option>
            <option value='deck'>デッキ</option>
          </select>
          <select className='sort' value='recent'>
            <option value='recent'>新着順</option>
            <option value='cost_asc'>コスト昇順</option>
            <option value='cost_desc'>コスト降順</option>
          </select>
        </div>
        <div className='cards'>
        {
          [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ].map((card, cardIndex) => {
            return <div className='card_container'>{cardIndex}</div>;
          })
        }
        </div>
      </div>
    </div>
  );
}
