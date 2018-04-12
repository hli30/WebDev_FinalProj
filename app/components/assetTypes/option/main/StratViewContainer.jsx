import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import ExamineList from './priceView/ExamineList.jsx';
// import RiskAnalysis from './stratView/RiskAnalysis.jsx';
// import TradeList from './stratView/TradeList.jsx';
import Chart from './stratView/chart.jsx';
require('../../../../../styles/chart.scss');
export default class StratViewContainer extends Component {
  render () {
    return (
      <div>
        {/* <RiskAnalysis/>
        <TradeList/>  */}
        {/* <ExamineList examineList={this.props.examineList}/> */}

        <Chart />

      </div>
    )
  }
}

StratViewContainer.propTypes = {
  examineList: PropTypes.array
}