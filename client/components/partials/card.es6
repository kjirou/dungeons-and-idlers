import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'CardComponent',
  mixins: [ComponentMixin],

  propTypes: {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    isFace: React.PropTypes.bool,
    isClickable: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      top: 0,
      left: 0,
      isFace: false,
      isClickable: false
    };
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      cursor: this.props.isClickable ? 'pointer' : 'default'
    };

    let actionDataList = [
      { order: 1, label: 'ATK' },
      { order: 2, label: 'ATK', isCurrent: true },
      { order: 3, label: '--' },
      { order: 4, label: 'SP' },
      { order: 5, label: '--', isHidden: true },
      { order: 6, label: '--', isHidden: true }
    ];

    return (
      <div className={createComponentClassName('card')} style={style}>
        <div className='face' style={{ display: this.props.isFace ? 'block' : 'none' }}>
          <div className='icon minotaur-monster-bg_img'></div>
          <div className='hp_container'>
            <span className='hp'>78</span>
            <span className='separator'>/</span>
            <span className='max_hp'>99</span>
          </div>
          <div className='damage_container'>
            <span className='unit'>ATK</span>
            <span className='value'>99</span>
          </div>
          <div className='passive_skills_container'>
            <span>先制</span>
            <span>追跡</span>
          </div>
          <div className='actions'>
          {
            actionDataList.map(({ order, label, isCurrent, isHidden }) => {
              let key = 'cell-' + order;
              let classNames = ['cell', key];
              if (isCurrent) classNames.push('current');
              let style = {
                display: isHidden ? 'none' : 'block'
              };
              return <div key={key} className={classNames.join(' ')} style={style}>
                <div key='order' className='order'>{order}</div>
                <div key='label' className='label'>{label}</div>
              </div>;
            })
          }
          </div>
        </div>
        <div className='back' style={{ display: this.props.isFace ? 'none' : 'block' }}>
          <div className='icon downstairs-object-bg_img'></div>
        </div>
      </div>
    );
  }
});
