import React from 'react';


export default function jsxTemplate({className, style, onMouseDown}) {
  return (
    <div className={className} style={style} onMouseDown={onMouseDown}>
      <h2>Dungeons &amp; Idlers</h2>
      <div className='touch-to-start'>- Touch to Start -</div>
    </div>
  );
}
