import React, {Component} from 'react';
import RiskAnalysisRow from './RiskAnalysisRow.jsx';
import PropTypes from 'prop-types';

export default class RiskAnalysis extends Component {
  constructor (props) {
    super(props);

    this.state = {
      btnClicked: false
    }

    this.tradeSubmitBtnHandler = this.tradeSubmitBtnHandler.bind(this);
  }

  tradeSubmitBtnHandler () {
    this.setState({btnClicked: true});
    console.log(this.props.selectedTrades)
    console.log(this.state.btnClicked)
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
                <td>Net Premium</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>sum here</td>
              </tr>
              {/* <tr>
                <td>
                  <button className="btn btn-primary" onClick={this.tradeSubmitBtnHandler}>Submit</button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

RiskAnalysis.propTypes = {
  selectedTrades: PropTypes.array
}
