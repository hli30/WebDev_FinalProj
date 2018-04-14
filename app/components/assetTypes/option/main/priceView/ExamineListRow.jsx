import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ExamineListRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quantity: 1
    }
    this.buyOptionClickHandler = this.buyOptionClickHandler.bind(this);
    this.sellOptionClickHandler = this.sellOptionClickHandler.bind(this);
    this.quantityTextChangeHandler = this.quantityTextChangeHandler.bind(this);
  }

  buyOptionClickHandler (e) {
    let optionObj = this.reassembleOptionObj(JSON.parse(e.target.value), 'buy');
    this.props.addToSelectedTrades(optionObj);
  }

  sellOptionClickHandler (e) {
    let optionObj = this.reassembleOptionObj(JSON.parse(e.target.value), 'sell');
    this.props.addToSelectedTrades(optionObj);
  }

  quantityTextChangeHandler (e) {
    this.setState({quantity: e.target.value});
  }

  reassembleOptionObj (option, action) {
    const {ask, bid, expiry, type, strike} = option;
    let optionObj = {
      action,
      type,
      strike,
      expiry: this.calculateDaysToExpiry(expiry),
      premium: action === 'buy' ? ask : bid,
      quantity: Number(this.state.quantity)
    };
    return optionObj;
  }

  calculateDaysToExpiry (expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeinmilisec = expiry.getTime() - today.getTime();
    return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));
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
          <td>
            <input 
              type="text"
              value={this.state.quantity}
              onChange={this.quantityTextChangeHandler}
            />
          </td>
          <td>
            <button value={JSON.stringify(this.props.option)} onClick={this.buyOptionClickHandler}>Buy</button>
            <button value={JSON.stringify(this.props.option)} onClick={this.sellOptionClickHandler}>Sell</button>
          </td>
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