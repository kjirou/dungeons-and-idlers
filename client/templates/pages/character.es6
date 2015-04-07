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
        <h2>Character Page</h2>
      </div>
    </div>
  );
}

//
// レイアウトのメモ
//
// 左側:
//   左上から二列二行で4メンバーを表示する現在編集中パーティ
//   上部に 1 - 5 の切り替えボタンを作る
//
// 右側:
//   3-5列 x n行 の冒険者リスト
//   上にソート変更用のバーが付く
//
