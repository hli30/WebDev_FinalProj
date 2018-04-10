import React, {Component} from 'react';
import OptionChain from './priceView/OptionChain.jsx';
import WatchList from './priceView/WatchList.jsx';
import ExamineList from './priceView/ExamineList.jsx';
import BlackScholes from './priceView/BlackScholes.jsx';
import PropTypes from 'prop-types';

export default class PriceViewContainer extends Component {

  render () {
    return (
      <div>
        <OptionChain
          getOptionChain={this.props.getOptionChain}
          addToExamineList={this.props.addToExamineList}
          optionChain={this.props.optionChain}
        /> 
        <WatchList 
          addToWatchList={this.props.addToWatchList}
          watchList={this.props.watchList}
        />
        <BlackScholes/>
        <ExamineList
          examineList={this.props.examineList}
        />
      </div>
    )
  }
}

PriceViewContainer.propTypes = {
  getOptionChain: PropTypes.func,
  addToWatchList: PropTypes.func,
  optionChain: PropTypes.array,
  watchList: PropTypes.array,
  addToExamineList: PropTypes.func,
  examineList: PropTypes.array
}