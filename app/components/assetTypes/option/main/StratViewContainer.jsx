import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExamineList from './priceView/ExamineList.jsx';
import RiskAnalysis from './stratView/RiskAnalysis.jsx';
// import RiskRewardChart from './stratView/RiskRewardChart.jsx';

export default class StratViewContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrades : [],
    }

    this.addToSelectedTrades = this.addToSelectedTrades.bind(this);
  }

  addToSelectedTrades (optionObj) {
    // console.log(optionObj);
    this.setState({selectedTrades: this.state.selectedTrades.concat(optionObj)});
  }
  
  render () {
    return (
      <div className="col-11 reset-padding">
        <div className="row">
          <RiskAnalysis
            selectedTrades={this.state.selectedTrades}
          />
        </div>
        <div className="row">
          <ExamineList 
            examineList={this.props.examineList}
            addToSelectedTrades={this.addToSelectedTrades}
            currentView={this.props.currentView}
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