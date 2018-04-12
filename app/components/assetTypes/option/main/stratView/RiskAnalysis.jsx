import React, {Component} from 'react';

export default class RiskAnalysis extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Buy / Sell</th>
              <th>Quantity</th>
              <th>Call / Put</th>
              <th>Strike</th>
              <th>Days to Expiry</th>
              <th>Volatility %</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            {/* {row} */}
          </tbody>
        </table>
      </div>
    )
  }
}
