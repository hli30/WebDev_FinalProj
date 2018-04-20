import React, {Component} from 'react';
import RiskAnalysisRow from './RiskAnalysisRow.jsx';
import PropTypes from 'prop-types';

export default class RiskAnalysis extends Component {
  constructor (props) {
    super(props);

    this.state = {
      btnClicked: false
    }
  }

  render() {
    const rowOfSelectedOption = this.props.selectedTrades.map((option, index) =>
      (<RiskAnalysisRow
        key={index}
        index={index}
        {...option}
        btnClicked={this.state.btnClicked}
      />));
    return (
      <div className="col" >
        <div id="selected-trades-container">
          <table className="table table-hover table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Buy / Sell</th>
                <th>Quantity</th>
                <th>Call / Put</th>
                <th>Strike</th>
                <th>Days to Expiry</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              {rowOfSelectedOption}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-bold">Net Debit/Credit</td>
                <td>$
                  {Math.abs(this.props.tradesTotal)}
                  {this.props.tradesTotal >= 0 ? ' CR' : ' DR'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

RiskAnalysis.propTypes = {
  selectedTrades: PropTypes.array,
  tradesTotal: PropTypes.number
}
