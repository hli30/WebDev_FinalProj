import React, {Component} from 'react';
import OptionChain from './priceView/OptionChain.jsx';
import WatchList from './priceView/WatchList.jsx';
import ExamineList from './priceView/ExamineList.jsx';
import BlackScholes from './priceView/BlackScholes.jsx';

export default class PriceViewContainer extends Component {
  render () {
    return (
      <div>
        <OptionChain/>
        <WatchList/>
        <BlackScholes/>
        <ExamineList/>
      </div>   
    )
  }
}