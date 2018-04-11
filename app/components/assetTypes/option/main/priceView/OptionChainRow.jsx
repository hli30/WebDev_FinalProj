import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class OptionChainRow extends Component {
  constructor (props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler (e) {
    this.props.constructOptionObjAndPassUp({
      strike: this.props.strike,
      type: JSON.parse(e.target.value)._type,
      symbol: JSON.parse(e.target.value)._symbol
    });
    console.log(this.props.symbol);
  }

  render () {
    return (
      <tr>
        <td><button type='button' className='callButton' value={JSON.stringify(this.props.call)} onClick={this.optionClickHandler}>+</button></td>
        <td className='OptionChainRow'>{this.props.callLast}</td>
        <td className='OptionChainRow'>{this.props.callChange}</td>
        <td className='OptionChainRow'>{this.props.callVol}</td>
        <td className='OptionChainRow'>{this.props.callBid}</td>
        <td className='OptionChainRow'>{this.props.callAsk}</td>
        <td className='OptionChainRow'>{this.props.callOpenInt}</td>
        <td className='OptionChainRow Strike'>{this.props.strike}</td>
        <td className='OptionChainRow'>{this.props.putLast}</td>
        <td className='OptionChainRow'>{this.props.putChange}</td>
        <td className='OptionChainRow'>{this.props.putVol}</td>
        <td className='OptionChainRow'>{this.props.putBid}</td>
        <td className='OptionChainRow'>{this.props.putAsk}</td>
        <td className='OptionChainRow'>{this.props.putOpenInt}</td>
        <td><button type='button' className='callButton' value={JSON.stringify(this.props.put)} onClick={this.optionClickHandler}>+</button></td>
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
