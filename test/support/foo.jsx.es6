import React from 'react';


export default function jsxTemplate({className, style, title, child}) {
  return (
    <div className={className} style={style}>
      <h1>{title}</h1>
      <child.ChildComponent propToWidth={child.propToWidth} />
    </div>
  );
}
