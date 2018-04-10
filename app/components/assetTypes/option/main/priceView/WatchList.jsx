import React, {Component} from 'react';
import WatchListRow from './WatchListRow.jsx';
import PropTypes from 'prop-types';

export default class WatchList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      symbol: ''
    }
    this.symbolInputHandler = this.symbolInputHandler.bind(this);
    this.expiryChangeHandler = this.expiryChangeHandler.bind(this);
    this.watchlistSubmitHandler = this.watchlistSubmitHandler.bind(this);
  }

  symbolInputHandler (e) {
    this.setState({symbol: e.target.value});
  }

  expiryChangeHandler (e) {
    this.setState({expiry: e.target.value});
  }

  watchlistSubmitHandler (e) {
    e.preventDefault();
    this.props.addToWatchList(this.state.symbol, this.state.expiry);
    this.setState({symbol: ''});
  }

  render () {
    const row = this.props.watchList.map((row, index) => 
    (<WatchListRow
      key={index}
      index={index}
      symbol={row.symbol}
      price={row.price}
      change={row.change}
      pctChange={row.pctChange}
    />))

    return (
      <div>
        <h3>WatchList</h3>

        <form className ="watchlist" onSubmit={this.watchlistSubmitHandler}>
          <input
            type="text"
            placeholder="Symbol"
            value={this.state.symbol}
            onChange={this.symbolInputHandler}
          />
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
            {row}
          </tbody>
        </table>  
      </div>
    )
  }
}

WatchList.propTypes = {
  watchList: PropTypes.array,
  addToWatchList: PropTypes.func
}