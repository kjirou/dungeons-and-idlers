import React from 'react';

import BuffComponent from 'client/components/partials/buff';
import {createComponentClassName} from 'client/lib/view';
import ComponentMixin from 'client/mixins/component';


export default React.createClass({
  displayName: 'BuffListComponent',
  mixins: [ComponentMixin],

  propTypes: {
    buffDataList: React.PropTypes.array.isRequired,
    isHidden: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      isHidden: false
    };
  },

  render() {
    let style = {
      display: this.props.isHidden ? 'none' : 'block'
    };

    let buffPropsList = this.props.buffDataList.map(({ buffType, duration }, buffIndex) => {
      return {
        key: 'buff-' + buffIndex,
        left: buffIndex * 32,
        buffType,
        duration
      };
    });

    return (
      <div className={createComponentClassName('buff_list')} style={style}>
      {
        buffPropsList.map((buffProps) => {
          return <BuffComponent {...buffProps} />;
        })
      }
      </div>
    );
  }
});
