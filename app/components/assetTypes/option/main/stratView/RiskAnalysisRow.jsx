import React, {Component} from 'react';

export default class RiskAnalysisRow extends Component {
  render() {
    return (
      <tr>
        <th>Buy / Sell</th>
        <th>Quantity</th>
        <th>Call / Put</th>
        <th>Strike</th>
        <th>Days to Expiry</th>
        <th>Volatility %</th>
        <th>Premium</th>
      </tr>
    )
  }
}