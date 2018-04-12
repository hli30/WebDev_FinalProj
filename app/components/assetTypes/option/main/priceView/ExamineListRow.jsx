import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamineListRow extends Component {
  render () {
    return (
      <tr>
        <td>{this.props.description}</td>
        <td>{this.props.bid}</td>
        <td>{this.props.ask}</td>
      </tr>
    )
  }
}

ExamineListRow.propTypes = {
  description: PropTypes.string,
  bid: PropTypes.number,
  ask: PropTypes.number
}