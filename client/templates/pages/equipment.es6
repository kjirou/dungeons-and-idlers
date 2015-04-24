import _ from 'lodash';
import React from 'react';


// debug
import {TorchEquipment} from 'client/lib/equipments';


function equipmentHeaderRow() {
  return (
    <tr className='row_1'>
      <th className='col_1'>&nbsp;</th>
      <th className='col_2'>カード名</th>
      <th className='col_3'>概要</th>
      <th className='col_4'>所持(使用)</th>
      <th className='col_5'>装備</th>
      <th className='col_6'>コスト</th>
      <th className='col_7'>&nbsp;</th>
    </tr>
  );
}

function equipmentRow(equipment, equipmentCount) {
  return (
    <tr>
      <td className='col_1'><div className={equipment.getIconClassName()}/></td>
      <td className='col_2'>{equipment.getName()}</td>
      <td className='col_3'>{equipment.getSummary()}</td>
      <td className='col_4'>
        <span className='total'>4</span>
        <span className='used'>(3)</span>
      </td>
      <td className='col_5'>{equipmentCount}</td>
      <td className='col_6'>{equipment.getEquipmentCost() * equipmentCount}</td>
      <td className='col_7'>
        <div className='button button-first'>+</div>
        <div className='button'>-</div>
        <div className='button'>↑</div>
        <div className='button button-last'>↓</div>
      </td>
    </tr>
  );
}


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  charactersStore,
  selectedCharacterName,
  selectedCharacterElement,
  onMouseDownCharacterName,
  onMouseDownNextCharacter,
  onMouseDownPrevCharacter
}) {
  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='page_column left-page_column'>
          <div className='character_pagination'>
            <div className='part left-part' onMouseDown={onMouseDownPrevCharacter}>&lt;</div>
            <div className='part center-part' onMouseDown={onMouseDownCharacterName}>{selectedCharacterName}</div>
            <div className='part right-part' onMouseDown={onMouseDownNextCharacter}>&gt;</div>
          </div>
          <div className='card_container'>
            {selectedCharacterElement}
          </div>
        </div>

        <div className='page_column right-page_column'>

          <section className='section_1'>
            <div className='headline'>
              <h3>サブアクション</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {equipmentRow(TorchEquipment, 2)}
            </table>
            <div className='add_equipment_button'>+追加</div>
          </section>

          <section>
            <div className='headline'>
              <h3>フィート</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
            </table>
            <div className='add_equipment_button'>+追加</div>
          </section>

          <section>
            <div className='headline'>
              <h3>デッキ</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
            </table>
            <div className='add_equipment_button'>+追加</div>
          </section>

        </div>
      </div>
    </div>
  );
}
