import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RiskAnalysisRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.action}</td>
        <td>{this.props.quantity}</td>
        <td>{this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)}</td>
        <td>{this.props.strike}</td>
        <td>{this.props.expiry}</td>
        <td>${this.props.premium}</td>
      </tr>
    )
  }
}

RiskAnalysisRow.propTypes = {
  action: PropTypes.string,
  quantity: PropTypes.number,
  type: PropTypes.string,
  strike: PropTypes.number,
  expiry: PropTypes.number,
  premium: PropTypes.number
}