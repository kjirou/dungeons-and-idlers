import React from 'react';

import ViewMixin from 'client/mixins/view';


export default React.createClass({
  displayName: 'ScreenView',
  mixins: [ViewMixin],

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  render: function render() {
    return React.createElement('div',
      {
        className: 'screen',
        style: {
          width: this.props.width,
          height: this.props.height
        },
      },
      'Hello, screen!' // pageElement
    );
  }
});


//{componentNameToKey} = require 'client/lib/react'
//{GamePageView} = require 'client/views/pages/game'
//{WelcomePageView} = require 'client/views/pages/welcome'
//
//  getInitialState: ->
//    currentPageId: @props.deps.screenStore.currentPageId
//
//  componentWillMount: ->
//    @pipeStoreAttributeToState @props.deps.screenStore, 'currentPageId'
//
//  render: ->
//    # @TODO この処理、DOMも全部を書き換えてるの？
//    #       それだとたぶん遅すぎるので要調査
//    pageComponent = switch @state.currentPageId
//      when 'GamePageView' then GamePageView
//      when 'WelcomePageView' then WelcomePageView
//      else throw new Error 'Invalid page-component name'
//    pageElement = React.createElement pageComponent,
//      key: componentNameToKey pageComponent.displayName
//      deps: @props.deps
//      coreActionCreator: @props.deps.coreActionCreator
//      width: @props.width
//      height: @props.height
