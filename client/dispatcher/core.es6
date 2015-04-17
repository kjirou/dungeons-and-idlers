import {Dispatcher} from 'flux';
import _ from 'lodash';

import SingletonMixin from 'client/lib/mixins/singleton';


export default class CoreDispatcher extends Dispatcher {

  handleViewAction(action) {
    this.dispatch({
      source: 'view_action',
      action
    });
  }
}

_.assign(CoreDispatcher, SingletonMixin);
