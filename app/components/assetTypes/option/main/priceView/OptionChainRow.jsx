import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OptionChainRow extends Component {
  constructor (props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler (e) {
    this.props.addToExamineList(JSON.parse(e.target.value)._symbol);
  }

  render () {
    return (
      <tr>
        <td><button type="button" value={JSON.stringify(this.props.call)} onClick={this.optionClickHandler}>+</button></td>
        <td>{this.props.callLast}</td>
        <td className={this.props.callChange >= 0 ? 'positive-num' : 'negative-num'}>
          {this.props.callChange}
        </td>
        <td>{this.props.callVol}</td>
        <td>{this.props.callBid}</td>
        <td>{this.props.callAsk}</td>
        <td>{this.props.callOpenInt}</td>
        <td id="strike">{this.props.strike}</td>
        <td>{this.props.putLast}</td>
        <td className={this.props.putChange >= 0 ? 'positive-num' : 'negative-num'}>
          {this.props.putChange}
        </td>
        <td>{this.props.putVol}</td>
        <td>{this.props.putBid}</td>
        <td>{this.props.putAsk}</td>
        <td>{this.props.putOpenInt}</td>
        <td><button type="button" value={JSON.stringify(this.props.put)} onClick={this.optionClickHandler}>+</button></td>
      </tr>  
    )
  }
}

OptionChainRow.propTypes = {
  callLast: PropTypes.number,
  callChange: PropTypes.number,
  callVol: PropTypes.number,
  callBid: PropTypes.number,
  callAsk: PropTypes.number,
  callOpenInt: PropTypes.number,
  strike: PropTypes.number,
  putLast: PropTypes.number,
  putChange: PropTypes.number,
  putVol: PropTypes.number,
  putBid: PropTypes.number,
  putAsk: PropTypes.number,
  putOpenInt: PropTypes.number,
  addToExamineList: PropTypes.func,
  call: PropTypes.object,
  put: PropTypes.object
}
