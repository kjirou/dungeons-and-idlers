import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';


let CreatureCardBodyComponent = React.createClass({
  displayName: 'CreatureCardBodyComponent',
  mixins: [ComponentMixin],
  propTypes: {
    hp: React.PropTypes.number.isRequired,
    maxHp: React.PropTypes.number.isRequired,
    physicalAttackPower: React.PropTypes.number.isRequired,
    actions: React.PropTypes.array.isRequired,
    feats: React.PropTypes.array.isRequired,
    subActionName: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <div className={createComponentClassName('card_body', 'creature') }>
        <div className='icon_and_states'>
          <div className='icon minotaur-monster-bg_img'></div>
          <div className='hp_container'>
            <span className='hp'>{this.props.hp}</span>
            <span className='separator'>/</span>
            <span className='max_hp'>{this.props.maxHp}</span>
          </div>
          <div className='damage_container'>
            <span className='unit'>ATK</span>
            <span className='value'>{this.props.physicalAttackPower}</span>
          </div>
        </div>
        <div className='actions_and_feats'>
          <table className='actions'>
          {
            this.props.actions.map((action, idx) => {
              return <tr key={'action-' + idx}>
                <th>{idx + 1}</th><td>{action.name}</td>
              </tr>;
            })
          }
          </table>
          <table className='feats'>
          {
            this.props.feats.map((feat, idx) => {
              return <tr key={'feat-' + idx}>
                <td>{feat.name}</td>
              </tr>;
            })
          }
          </table>
        </div>
        <div className='sub_action'>狂暴化</div>
      </div>
    );
  }
});


export default React.createClass({
  displayName: 'CardComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    isFace: React.PropTypes.bool,
    isClickable: React.PropTypes.bool,
    mode: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      top: 0,
      left: 0,
      isFace: false,
      isClickable: false,
      mode: 'simple'
    };
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      cursor: this.props.isClickable ? 'pointer' : 'default'
    };

    //let actionDataList = [
    //  { order: 1, label: 'ATK' },
    //  { order: 2, label: 'ATK', isCurrent: true },
    //  { order: 3, label: '--' },
    //  { order: 4, label: 'SP' },
    //  { order: 5, label: '--', isHidden: true },
    //  { order: 6, label: '--', isHidden: true }
    //];
    //        //actionDataList.map(({ order, label, isCurrent, isHidden }) => {
    //        //  let key = 'cell-' + order;
    //        //  let classNames = ['cell', key];
    //        //  if (isCurrent) classNames.push('current');
    //        //  let style = {
    //        //    display: isHidden ? 'none' : 'block'
    //        //  };
    //        //  return <div key={key} className={classNames.join(' ')} style={style}>
    //        //    <div key='order' className='order'>{order}</div>
    //        //    <div key='label' className='label'>{label}</div>
    //        //  </div>;
    //        //})
    //      }

    return (
      <div className={createComponentClassName('card')} style={style}>
        <div className='face' style={{ display: this.props.isFace ? 'block' : 'none' }}>
        {
          <CreatureCardBodyComponent {...{
            hp: 77,
            maxHp: 99,
            physicalAttackPower: 99,
            actions: [
              { name: '打撃' },
              { name: '打撃' },
              { name: '強打' }
            ],
            feats: [
              { name: '後手' }
            ],
            subActionName: '凶暴化'
          }}/>
        }
        </div>
        <div className='back' style={{ display: this.props.isFace ? 'none' : 'block' }}>
          <div className='icon downstairs-object-bg_img'></div>
        </div>
      </div>
    );
  }
});
