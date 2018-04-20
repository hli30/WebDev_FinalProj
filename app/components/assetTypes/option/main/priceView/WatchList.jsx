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
      setOptionDefaultFromWatchlistClick={this.props.setOptionDefaultFromWatchlistClick}
      getOptionChain={this.props.getOptionChain}
    />))

    return (
      <div className="col-6" id="watchlist">
        <div className="watchlist-header">
          <form className="form-inline" onSubmit={this.watchlistSubmitHandler}>
            <label>Watchlist</label>
            <input
              className="input-field form-control"
              type="text"
              placeholder="Symbol"
              value={this.state.symbol}
              onChange={this.symbolInputHandler}
            />
            <input className="btn btn-primary" type="submit" value="Add"/>
          </form>
        </div>
        <table className="table table-hover table-bordered table-striped">
          <thead className="thead-dark">
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
  addToWatchList: PropTypes.func,
  setOptionDefaultFromWatchlistClick: PropTypes.func,
  getOptionChain: PropTypes.func
}