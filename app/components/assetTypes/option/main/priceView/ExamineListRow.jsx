import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamineListRow extends Component {
  constructor (props) {
    super(props);
    this.buyOptionClickHandler = this.buyOptionClickHandler.bind(this);
    this.sellOptionClickHandler = this.sellOptionClickHandler.bind(this);
  }

  buyOptionClickHandler (e) {
    console.log(e.target.value);
    this.props.addToSelectedTrades(e.target.value);
  }

  sellOptionClickHandler (e) {
    this.props.addToSelectedTrades(e.target.value);
  }

  render () {
    if (this.props.currentView === 'priceView') {
      return (
        <tr>
          <td>{this.props.description}</td>
          <td>{this.props.bid}</td>
          <td>{this.props.ask}</td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{this.props.description}</td>
          <td>{this.props.bid}</td>
          <td>{this.props.ask}</td>
          <td><button value={this.props.option} onClick={this.buyOptionClickHandler}>Buy</button></td>
          <td><button value={this.props.option} onClick={this.sellOptionClickHandler}>Sell</button></td>
        </tr>
      )
    }
  }
}

ExamineListRow.propTypes = {
  description: PropTypes.string,
  bid: PropTypes.number,
  ask: PropTypes.number,
  option: PropTypes.object
}