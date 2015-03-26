import _ from 'lodash';
import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';


export default React.createClass({
  displayName: 'InventoryComponent',
  mixins: [ComponentMixin],

  render() {
    const MAX_POCKET_COUNT = 12;
    let inventoryStore = {
      pocketCount: 9,
      treasureDataList: [
        { treasureType: 'key' },
        { treasureType: 'box' },
        { treasureType: 'key' },
        { treasureType: 'jewel' },
        { treasureType: 'chest' },
        { treasureType: 'gold' },
        { treasureType: 'chest' }
      ]
    };

    return (
      <div className={createComponentClassName('inventory')}>
      {
        _.range(MAX_POCKET_COUNT).map((pocketIndex) => {
          let treasureData = inventoryStore.treasureDataList[pocketIndex];

          let key = 'pocket-' + pocketIndex;
          let classNames = ['pocket'];

          // Item exists
          if (treasureData) {
            classNames.push(treasureData.treasureType + '-object-bg_img');
          // Cannot store
          } else if (pocketIndex + 1 > inventoryStore.pocketCount) {
            classNames.push('invalid-symbol-bg_img');
          }

          let style = {
            top: ~~(pocketIndex / 2) * (32 + 2),
            left: pocketIndex % 2 ? (32 + 2) : 0
          };

          return <div key={key} className={classNames.join(' ')} style={style}></div>;
        })
      }
      </div>
    );
  }
});
