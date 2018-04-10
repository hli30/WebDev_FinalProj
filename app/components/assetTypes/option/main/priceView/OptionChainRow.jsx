import React, {Component} from 'react';
import Proptypes from 'prop-types';

export default class OptionChainRow extends Component {
  constructor (props) {
    super(props);
    this.leftOptionClickHandler = this.leftOptionClickHandler.bind(this);
  }

  leftOptionClickHandler (e) {
    e.preventDefault();
    console.log(e.event)
  }

  render () {
    return (
      <tr>
        <td><button type='button' onClick={this.leftOptionClickHandler}>+</button></td>
        <td>{this.props.callLast}</td>
        <td>{this.props.callChange}</td>
        <td>{this.props.callVol}</td>
        <td>{this.props.callBid}</td>
        <td>{this.props.callAsk}</td>
        <td>{this.props.callOpenInt}</td>
        <td>{this.props.strike}</td>
        <td>{this.props.putLast}</td>
        <td>{this.props.putChange}</td>
        <td>{this.props.putVol}</td>
        <td>{this.props.putBid}</td>
        <td>{this.props.putAsk}</td>
        <td>{this.props.putOpenInt}</td>
        <td><button type='button'>+</button></td>
      </tr>  
    )
  }
}

OptionChainRow.propTypes = {
  callLast: Proptypes.number,
  callChange: Proptypes.number,
  callVol: Proptypes.number,
  callBid: Proptypes.number,
  callAsk: Proptypes.number,
  callOpenInt: Proptypes.number,
  strike: Proptypes.number,
  putLast: Proptypes.number,
  putChange: Proptypes.number,
  putVol: Proptypes.number,
  putBid: Proptypes.number,
  putAsk: Proptypes.number,
  putOpenInt: Proptypes.number
}
