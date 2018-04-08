import React from 'react';
import PropTypes from 'prop-types';

export default function WatchListRow ({symbol, price, change, pctChange}) {
  return(
    <tr>
      <td>{symbol}</td>
      <td>{price}</td>
      <td>{change}</td>
      <td>{pctChange}</td>
    </tr>
  )
}

WatchListRow.propTypes = {
  symbol: PropTypes.string,
  price: PropTypes.number,
  change: PropTypes.number,
  pctChange: PropTypes.number
}