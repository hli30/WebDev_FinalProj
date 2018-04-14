import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamineListRow extends Component {
  constructor (props) {
    super(props);
    this.buyOptionClickHandler = this.buyOptionClickHandler.bind(this);
    this.sellOptionClickHandler = this.sellOptionClickHandler.bind(this);
  }

  buyOptionClickHandler (e) {
    let optionObj = JSON.parse(e.target.value);
    optionObj.action = 'buy';
    this.props.addToSelectedTrades(optionObj);
  }

  sellOptionClickHandler (e) {
    let optionObj = JSON.parse(e.target.value);
    optionObj.action = 'sell';
    this.props.addToSelectedTrades(optionObj);
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
          <td><button value={JSON.stringify(this.props.option)} onClick={this.buyOptionClickHandler}>Buy</button></td>
          <td><button value={JSON.stringify(this.props.option)} onClick={this.sellOptionClickHandler}>Sell</button></td>
        </tr>
      )
    }
  }
}

ExamineListRow.propTypes = {
  description: PropTypes.string,
  bid: PropTypes.number,
  ask: PropTypes.number,
  option: PropTypes.object,
  addToSelectedTrades: PropTypes.func,
  currentView: PropTypes.string
}