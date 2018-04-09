import React, {Component} from 'react';
import OptionChainRow from './OptionChainRow.jsx';

export default class OptionChain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      symbol: '',
      expiry: 'April-20-2018'
    }
    this.symbolInputHandler = this.symbolInputHandler.bind(this);
    this.expiryChangeHandler = this.expiryChangeHandler.bind(this);
    this.optionSubmitHandler = this.optionSubmitHandler.bind(this);
  }

  symbolInputHandler (e) {
    this.setState({symbol: e.target.value});
  }

  expiryChangeHandler (e) {
    this.setState({expiry: e.target.value});
  }

  optionSubmitHandler (e) {
    e.preventDefault();
    this.props.getOptionChain(this.state.symbol, this.state.expiry);
    this.setState({symbol: ''});
  }

  render () {
    return (
      <div>
        <h3>Option Chain</h3>

        <form className ="optionChain-form" onSubmit={this.optionSubmitHandler}>
          <input
            type="text"
            placeholder="Symbol"
            value={this.state.symbol}
            onChange={this.symbolInputHandler}
          />
          <select onChange={this.expiryChangeHandler}>
            <option defaultValue="April-20-2018">April-20-2018</option>
            <option value="April-27-2018">April-27-2018</option>
          </select>
          <input type="submit" value="Add"/>
        </form>

        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>PctChange</th>
            </tr>
          </thead>

          <tbody>
            {optionRow}
          </tbody>
        </table>  
      </div>   
    )
  }
}