import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineList from './priceView/ExamineList.jsx';
import RiskAnalysis from './stratView/RiskAnalysis.jsx';

export default class StratViewContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrades : [],
      tradesTotal: 0
    }

    this.addToSelectedTrades = this.addToSelectedTrades.bind(this);
  }

  addToSelectedTrades (optionObj) {
    this.setState({selectedTrades: this.state.selectedTrades.concat(optionObj)}, () => {
      this.setState({tradesTotal: this.calculatePremiumSum()});
    });
  }

  calculatePremiumSum () {
    let total = 0;
    this.state.selectedTrades.forEach(trade => {
      let tempPremium;
      if (trade.action === 'Buy') {
        tempPremium = trade.premium * -1;
      } else {
        tempPremium = trade.premium;
      }
      let subTotal = tempPremium * trade.quantity;
      total += subTotal; 
    });
    return Math.round(total*100)/100;
  }
  
  render () {
    return (
      <div className="col-11 reset-padding">
        <div className="row">
          <RiskAnalysis
            selectedTrades={this.state.selectedTrades}
            tradesTotal={this.state.tradesTotal}
          />
        </div>
        <div className="row">
          <ExamineList 
            examineList={this.props.examineList}
            addToSelectedTrades={this.addToSelectedTrades}
            currentView={this.props.currentView}
            updatePremiumSum={this.updatePremiumSum}
          /> 
        </div>
      </div>
    )
  }
}

StratViewContainer.propTypes = {
  examineList: PropTypes.array,
  currentView: PropTypes.string
}