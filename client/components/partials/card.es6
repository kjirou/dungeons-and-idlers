import _ from 'lodash';
import React from 'react';

import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/lib/mixins/component';


let SimpleCardBodyComponent = React.createClass({
  displayName: 'SimpleCardBodyComponent',
  mixins: [ComponentMixin],
  propTypes: {
    title: React.PropTypes.string.isRequired,
    category: React.PropTypes.string,
    hp: React.PropTypes.number,
    iconClassName: React.PropTypes.string.isRequired,
    equipmentPartName: React.PropTypes.string,
    rarity: React.PropTypes.number,
    description: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      category: null,
      hp: null,
      equipmentPartName: '',
      rarity: null
    };
  },
  render() {
    let categoryElement = null;
    if (this.props.category) {
      categoryElement = <td className='category'>{
        (() => {
          return {
            deck: 'D',
            feat: 'F',
            sub_action: 'S'
          }[this.props.category] || '?';
        })()
      }</td>;
    }

    let titleClassName = 'title';
    if (this.props.title.length >= 8) titleClassName += ' small_font_size-title';

    let iconClassName = [
      'icon',
      this.props.iconClassName
    ].join(' ');

    return (
      <div className={createComponentClassName('card_body', 'simple') }>
        <table className='header'>
          <tr>
            {categoryElement}
            <td className={titleClassName}>{this.props.title}</td>
          </tr>
        </table>
        <div className='thumbnail_container'>
          <div className={iconClassName}/>
          {
            (() => {
              if (!this.props.equipmentPartName) return;
              return <div className='sub_category'>
                <span>{this.props.equipmentPartName}</span>
              </div>;
            })()
          }
          {
            (() => {
              if (!this.props.rarity) return;
              return <div className='rarity'>
                <div>{_.range(Math.min(this.props.rarity, 4)).map(() => '*').join('')}</div>
                <div>{_.range(this.props.rarity - 4).map(() => '*').join('')}</div>
              </div>;
            })()
          }
        </div>
        <div className='description'>{this.props.description}</div>
      </div>
    );
  }
});

let CreatureCardBodyComponent = React.createClass({
  displayName: 'CreatureCardBodyComponent',
  mixins: [ComponentMixin],
  propTypes: {
    iconClassName: React.PropTypes.string.isRequired,
    hp: React.PropTypes.number.isRequired,
    maxHp: React.PropTypes.number.isRequired,
    physicalAttackPower: React.PropTypes.number.isRequired,
    attacks: React.PropTypes.array.isRequired,
    skills: React.PropTypes.array.isRequired,
    subActionName: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <div className={createComponentClassName('card_body', 'creature') }>
        <div className='icon_and_states'>
          <div className={'icon ' + this.props.iconClassName}></div>
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
        <div className='attacks_and_skills'>
          <table className='attacks'>
          {
            this.props.attacks.map((action, idx) => {
              return <tr key={'action-' + idx}>
                <th>{idx + 1}</th><td>{action.name}</td>
              </tr>;
            })
          }
          </table>
          <table className='skills'>
          {
            this.props.skills.map((skill, idx) => {
              return <tr key={'skill-' + idx}>
                <td>{skill.name}</td>
              </tr>;
            })
          }
          </table>
        </div>
        <div className='sub_action'>{this.props.subActionName}</div>
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
    cardBodyType: React.PropTypes.string,
    cardBodyProps: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      top: 0,
      left: 0,
      isFace: false,
      isClickable: false,
      cardBodyType: 'simple',
      cardBodyProps: {
        title: 'Key',
        iconClassName: 'blank',
        description: '3 つ揃えると、出口の扉を開くことができます。'
      }
    };
  },

  render() {
    let style = {
      top: this.props.top,
      left: this.props.left,
      cursor: this.props.isClickable ? 'pointer' : 'default'
    };

    let cardBodyComponent = {
      simple: SimpleCardBodyComponent,
      creature: CreatureCardBodyComponent
    }[this.props.cardBodyType];
    let cardBodyElement = React.createElement(cardBodyComponent, this.props.cardBodyProps);

    return (
      <div className={createComponentClassName('card')} style={style}>
        <div className='face' style={{ display: this.props.isFace ? 'block' : 'none' }}>
          {cardBodyElement}
        </div>
        <div className='back' style={{ display: this.props.isFace ? 'none' : 'block' }}>
          <div className='icon downstairs-object-bg_img'></div>
        </div>
      </div>
    );
  }
});
