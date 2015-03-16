import _ from 'lodash';
import React from 'react';

import CardComponent from 'client/components/partials/card';
import {compileJsxTemplate, createPageComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';
import PageComponentMixin from 'client/mixins/page-component';


export default React.createClass({
  displayName: 'GamePageComponent',
  mixins: [ComponentMixin, PageComponentMixin],

  render() {
    let className = createPageComponentClassName('game');
    let style = this.createDefaultStyles();

    let cards = [
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 },
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 + 128 },
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 + 128 * 2 + 4 },
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 + 128 * 3 + 4 * 2 },
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 + 128 * 4 + 4 * 3 },
      { isHidden: false, isFace: false, isClickable: true, top: 16, left: 6 + 128 * 5 + 4 * 4 }
    ];

    return (
      <div className={className} style={style}>
      {
        cards.map((card) => {
          return React.createElement(CardComponent, card, null);
        })
      }
      </div>
    );
  }
});
