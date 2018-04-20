import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class WatchListRow extends Component {
  constructor (props) {
    super(props);
    this.symbolClickHandler = this.symbolClickHandler.bind(this);
  }

  symbolClickHandler (e) {
    e.preventDefault();
    this.props.setOptionDefaultFromWatchlistClick(e.target.innerText);
    this.props.getOptionChain(e.target.innerText, '2018-04-20');
  }

  render () {
    return (
      <tr>
        <td onClick={this.symbolClickHandler}>{this.props.symbol}</td>
        <td className={this.props.change >= 0 ? 'positive-num' : 'negative-num'}>
          {this.props.price}
        </td>
        <td className={this.props.change >= 0 ? 'positive-num' : 'negative-num'}>
          {this.props.change}
        </td>
        <td className={this.props.pctChange >= 0 ? 'positive-num' : 'negative-num'}>
          {this.props.pctChange}%
        </td>
      </tr>
    )
  }
}

WatchListRow.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.number,
  change: PropTypes.number,
  pctChange: PropTypes.number,
  setOptionDefaultFromWatchlistClick: PropTypes.func,
  getOptionChain: PropTypes.func
}