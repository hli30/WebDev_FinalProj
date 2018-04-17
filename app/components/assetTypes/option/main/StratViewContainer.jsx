import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineList from './priceView/ExamineList.jsx';
import RiskAnalysis from './stratView/RiskAnalysis.jsx';
import TradeList from './stratView/TradeList.jsx';
import RiskRewardChart from './stratView/RiskRewardChart.jsx';
// import Chart from './stratView/chart.jsx';
// require('../../../../../styles/chart.scss');
export default class StratViewContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrades : [],
      confirmedTrades: [],
      chartDataPoints: []
    }

    this.addToSelectedTrades = this.addToSelectedTrades.bind(this);
  }

  addToSelectedTrades (optionObj) {
    // console.log(optionObj);
    this.setState({selectedTrades: this.state.selectedTrades.concat(optionObj)});
  }

  // calculateDataPoints () {
  //   let totalPremium;
  //   let maxLoss;
  //   let maxGain;
  //   let breakeven;

  //   let dataArr = this.state.selectedTrades.map(({action, premium, quantity}) => {
  //     if (action === 'sell') {
  //       premium = -1 * premium;
  //       totalPremium = premium * quantity;
  //     }
  //   });
  // }
  
  render () {
    return (
      <div className="col-xs-9 main-shift-right">
        <TradeList/>
        <RiskAnalysis
          selectedTrades={this.state.selectedTrades}
        />
        <ExamineList 
          examineList={this.props.examineList}
          addToSelectedTrades={this.addToSelectedTrades}
          currentView={this.props.currentView}
        /> 
        <RiskRewardChart
          selectedTrades={this.state.selectedTrades}
        />

      </div>
    )
  }
}

StratViewContainer.propTypes = {
  examineList: PropTypes.array,
  currentView: PropTypes.string
}