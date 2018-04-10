import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamineListRow extends Component {
  constructor (props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  render () {
    return (
      <tr>
        <td>{this.props.symbol}</td>
        <td>{this.props.strike}</td>
        <td>{this.props.expiry}</td>
        <td>{this.props.bid}</td>
        <td>{this.props.ask}</td>
      </tr>
    )
  }
}

ExamineListRow.propTypes = {
  symbol: PropTypes.string,
  strike: PropTypes.number,
  expiry: PropTypes.number,
  bid: PropTypes.number,
  ask: PropTypes.number
}