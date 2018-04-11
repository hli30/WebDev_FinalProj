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
    console.log(e.target.innerText + ' clicked');
  }

  render () {
    return (
      <tr>
        <td onClick={this.symbolClickHandler}>{this.props.symbol}</td>
        <td>{this.props.price}</td>
        <td>{this.props.change}</td>
        <td>{this.props.pctChange}</td>
      </tr>
    )
  }
}

WatchListRow.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.number,
  change: PropTypes.number,
  pctChange: PropTypes.number
}