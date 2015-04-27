import _ from 'lodash';
import React from 'react';

import {createSelectField} from 'client/lib/view';


export default function characterPageTemplate({
  className,
  style,
  navigationBar,
  CardComponent,
  state,
  onMouseDownCharacterName,
  onMouseDownNextCharacter,
  onMouseDownPrevCharacter,
  createOnMouseDownChangeEquipmentPattern,
  createOnMouseDownAddNewEquipment,
  createOnMouseDownUpdateEquipment,
  createOnChangeEquipmentSelectField
}) {

  function equipmentHeaderRow() {
    return (
      <tr>
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

  /**
   * <div>
   *   [プルダウン] [+追加]
   * </div>
   */
  function createEquipmentAdder(category) {
    return (
      <div className='equipment_adder'>
        <div>{
          createSelectField({
            onChange: createOnChangeEquipmentSelectField(category)
          }, state.cardChoices[category])
        }</div>
        <div
          className='add_equipment_button' onMouseDown={createOnMouseDownAddNewEquipment(category)}
        >+追加</div>
      </div>
    );
  }


  return (
    <div className={className} style={style}>
      <navigationBar.NavigationBarComponent />
      <div className='inner_page'>
        <div className='page_column left-page_column'>
          <div className='character_pagination'>
            <div className='part left-part' onMouseDown={onMouseDownPrevCharacter}>&lt;</div>
            <div className='part center-part' onMouseDown={onMouseDownCharacterName}>{state.editingCharacter.getName()}</div>
            <div className='part right-part' onMouseDown={onMouseDownNextCharacter}>&gt;</div>
          </div>
          <section className='card_container'>
            <CardComponent {...(
              _.assign({}, state.editingCharacter.toCardComponentProps({ isPreview: true }))
            )}/>
          </section>
          <section className='equipment_patterns'>
            <h3>装備パターン</h3>
            <ul>{
              _.range(3).map((i) => {
                let props = {
                  key: 'pattern' + i,
                  onMouseDown: createOnMouseDownChangeEquipmentPattern(i)
                };
                if (state.editingCharacter.currentEquipmentPatternIndex === i) {
                  props.className = 'active';
                }
                return <li {...props}>{i + 1}</li>;
              })
            }</ul>
          </section>
          <section className='equipment_cost'>
            <h3>装備コスト</h3>
            <div>
              <span className='current'>{state.editingCharacter.computeEquipmentCost()}</span>
              <span className='separator'>/</span>
              <span className='max'>{state.editingCharacter.getEquipmentPower()}</span>
            </div>
          </section>
          <section className='hand_card_count'>
            <h3>手札数</h3>
            <div>{state.editingCharacter.getMaxHandCardCount()}</div>
          </section>
          <section className='deck_card_count'>
            <h3>デッキ枚数</h3>
            <div>
              <span className='current'>{state.editingCharacter.countEquipmentByCategory('deck')}</span>
              <span className='separator'>/</span>
              <span className='max'>{state.editingCharacter.getMaxDeckCardCount()}</span>
            </div>
          </section>
        </div>

        <div className='page_column right-page_column'>

          <section>
            <div className='headline'>
              <h3>サブアクション</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {
                state.editingCharacter.aggregatedEquipments.sub_action.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count, { isSubAction: true });
                })
              }
            </table>
            {
              (() => {
                if (state.editingCharacter.countEquipmentByCategory('sub_action') > 0) {
                  return;
                }
                return createEquipmentAdder('sub_action');
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
                state.editingCharacter.aggregatedEquipments.feat.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count);
                })
              }
            </table>
            {createEquipmentAdder('feat')}
          </section>

          <section>
            <div className='headline'>
              <h3>デッキ</h3>
            </div>
            <table>
              {equipmentHeaderRow()}
              {
                state.editingCharacter.aggregatedEquipments.deck.map((equipmentData, idx) => {
                  return equipmentRow(idx, equipmentData.equipment, equipmentData.count);
                })
              }
            </table>
            {createEquipmentAdder('deck')}
          </section>

        </div>
      </div>
    </div>
  );
}
