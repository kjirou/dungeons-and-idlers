import _ from 'lodash';
import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'InventoryComponent',
  mixins: [ComponentMixin],

  render() {
    let inventoryStore = {
      pocketCount: 16,
      treasureDataList: [
        { treasureType: 'key' },
        { treasureType: 'box' },
        { treasureType: 'key' },
        { treasureType: 'jewel' },
        { treasureType: 'gold' },
        { treasureType: 'chest' },
        { treasureType: 'gold' },
        { treasureType: 'chest' }
      ]
    };

    return (
      <div className={createComponentClassName('inventory')}>
      {
        _.range(inventoryStore.pocketCount).map((pocketIndex) => {
          let treasureData = inventoryStore.treasureDataList[pocketIndex];
          let key = 'pocket-' + pocketIndex;
          let classNames = ['pocket'];
          if (treasureData) classNames.push(treasureData.treasureType + '-object-bg_img');
          let style = {
            left: pocketIndex * (2 + 32)
          };
          return <div key={key} className={classNames.join(' ')} style={style}></div>;
        })
      }
      </div>
    );
  }
});
