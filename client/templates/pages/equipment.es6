import _ from 'lodash';
import React from 'react';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  editingCharacter,
  onMouseDownCharacterName,
  onMouseDownNextCharacter,
  onMouseDownPrevCharacter,
  createOnMouseDownUpdateEquipment
}) {

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

  function equipmentRow(idx, equipment, equipmentCount, options = {}) {
    options = _.assign({
      isSubAction: false
    }, options);

    let onIncrease = createOnMouseDownUpdateEquipment('increase', equipment.typeId);
    let onDecrease = createOnMouseDownUpdateEquipment('decrease', equipment.typeId);
    let onUp = createOnMouseDownUpdateEquipment('up', equipment.typeId);
    let onDown = createOnMouseDownUpdateEquipment('down', equipment.typeId);

    return (
      <tr key={'equipment_row-' + idx}>
        <td className='col_1'><div className={equipment.getIconClassName()}/></td>
        <td className='col_2'>{equipment.getName()}</td>
        <td className='col_3'>{equipment.getSummary()}</td>
        <td className='col_4'>
          <span className='total'>4</span>
          <span className='used'>(3)</span>
        </td>
        <td className='col_5'>{equipmentCount}</td>
        <td className='col_6'>{equipment.getEquipmentCost() * equipmentCount}</td>
        <td className='col_7'>{
          (function() {
            if (options.isSubAction) {
              return (
                <div>
                  <div className='button button-first button-last' onMouseDown={onDecrease}>-</div>
                </div>
              );
            } else {
              return (
                <div>
                  <div className='button button-first' onMouseDown={onIncrease}>+</div>
                  <div className='button' onMouseDown={onDecrease}>-</div>
                  <div className='button' onMouseDown={onUp}>↑</div>
                  <div className='button button-last' onMouseDown={onDown}>↓</div>
                </div>
              );
            }
          })()
        }</td>
      </tr>
    );
  }


  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='page_column left-page_column'>
          <div className='character_pagination'>
            <div className='part left-part' onMouseDown={onMouseDownPrevCharacter}>&lt;</div>
            <div className='part center-part' onMouseDown={onMouseDownCharacterName}>{editingCharacter.getName()}</div>
            <div className='part right-part' onMouseDown={onMouseDownNextCharacter}>&gt;</div>
          </div>
          <div className='card_container'>
            <CardComponent {...(
              _.assign({}, editingCharacter.toCardComponentProps(), {
                top: 8,
                left: 32
              })
            )}/>
          </div>
        </div>

        <div className='page_column right-page_column'>

          <section className='section_1'>
            <div className='headline'>
              <h3>サブアクション</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {
                editingCharacter.aggregatedEquipments.sub_action.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count, { isSubAction: true });
                })
              }
            </table>
            {
              (() => {
                if (editingCharacter.aggregatedEquipments.sub_action.length > 0) {
                  return;
                }
                return <div
                  className='add_equipment_button'
                  onMouseDown={createOnMouseDownUpdateEquipment('add', 'shooting')}
                >+追加</div>;
              })()
            }
          </section>

          <section>
            <div className='headline'>
              <h3>フィート</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {
                editingCharacter.aggregatedEquipments.feat.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count);
                })
              }
            </table>
            <div
              className='add_equipment_button'
              onMouseDown={createOnMouseDownUpdateEquipment('add', 'katana')}
            >+追加</div>
          </section>

          <section>
            <div className='headline'>
              <h3>デッキ</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {
                editingCharacter.aggregatedEquipments.deck.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count);
                })
              }
            </table>
            <div
              className='add_equipment_button'
              onMouseDown={
                function() {
                  return createOnMouseDownUpdateEquipment('add', _.shuffle(['dart', 'torch', 'lantern'])[0]);
                }
              }
            >+追加</div>
          </section>

        </div>
      </div>
    </div>
  );
}
