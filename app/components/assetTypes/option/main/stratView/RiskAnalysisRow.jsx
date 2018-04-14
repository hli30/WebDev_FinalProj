import React, {Component} from 'react';

export default class RiskAnalysisRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      action: this.props.action,
      quantity: 1,
      type: this.props.type,
      strike: this.props.strike,
      expiry: this.props.expiry,
      premium: this.getPremium(props.action)
    }

    this.actionToggleHandler = this.actionToggleHandler.bind(this);
    this.optionTypeToggleHandler = this.optionTypeToggleHandler.bind(this);
    this.quantityTextChangeHandler = this.quantityTextChangeHandler.bind(this);
    this.strikeTextChangeHandler = this.strikeTextChangeHandler.bind(this);
    this.expiryTextChangeHandler = this.expiryTextChangeHandler.bind(this);
    this.premiumTextChangeHandler = this.premiumTextChangeHandler.bind(this);
  }

  getPremium (action) {
    const { bid, ask } = this.props;
    return action === 'buy' ? ask : bid;
  }

  actionToggleHandler (e) {
    this.setState({
      action: e.target.value,
      premium: this.getPremium(e.target.value),
    });
  }

  optionTypeToggleHandler (e) {
    this.setState({type: e.target.value});
  }

  calculateDaysToExpiry (expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeinmilisec = expiry.getTime() - today.getTime();
    return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24));
  }

  quantityTextChangeHandler (e) {
    this.setState({quantity: e.target.value});
  }

  strikeTextChangeHandler (e) {
    this.setState({strike: e.target.value});
  }

  expiryTextChangeHandler (e) {
    this.setState({expiry: e.target.value});
  }

  premiumTextChangeHandler (e) {
    this.setState({premium: e.target.value});
  }

  render() {
    return (
      <tr>
        <td>
          <select onChange={this.actionToggleHandler} value={this.state.action}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </td>
        <td>
           <input 
            type="text" 
            value={this.state.quantity}
            onChange={this.quantityTextChangeHandler}
          /> 
        </td>
        <td>
          <select onChange={this.optionTypeToggleHandler} value={this.state.type}>
            <option value="call">Call</option>
            <option value="put">Put</option>
          </select>
        </td>
        <td>
           <input 
            type="text" 
            value={this.state.strike}
            onChange={this.strikeTextChangeHandler}
          /> 
        </td>
        <td>
           <input 
            type="text" 
            value={this.calculateDaysToExpiry(this.state.expiry)}
            onChange={this.expiryTextChangeHandler}
          /> 
        </td>
        <td>
           <input 
            type="text" 
            value={this.state.premium}
            onChange={this.premiumTextChangeHandler}
          /> 
        </td>
      </tr>
    )
  }
}

