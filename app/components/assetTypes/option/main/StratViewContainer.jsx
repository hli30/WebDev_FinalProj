import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineList from './priceView/ExamineList.jsx';
import RiskAnalysis from './stratView/RiskAnalysis.jsx';
import TradeList from './stratView/TradeList.jsx';

export default class StratViewContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrades : [],
      confirmedTrades: []
    }

    this.addToSelectedTrades = this.addToSelectedTrades.bind(this);
  }

  addToSelectedTrades (optionObj) {
    this.setState({selectedTrades: this.state.selectedTrades.concat(optionObj)});
  }

  render () {
    return (
      <div>
        {/* <TradeList/>   */}
        <RiskAnalysis 
          selectedTrades={this.props.selectedTrades}
        />
        <ExamineList 
          examineList={this.props.examineList}
          addToSelectedTrades={this.addToSelectedTrades}
          currentView={this.props.currentView}
        />
      </div>
    )
  }
}

StratViewContainer.propTypes = {
  examineList: PropTypes.array,
  selectedTrades: PropTypes.array
}