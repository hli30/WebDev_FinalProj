import React, {Component} from 'react';
import OptionChainRow from './OptionChainRow.jsx';
import Proptypes from 'prop-types';

require('../../../../../../style/OptionChain.scss');

export default class OptionChain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      symbol: this.props.clickedSymbol,
      expiry: '2018-04-20',
    }
    this.symbolInputHandler = this.symbolInputHandler.bind(this);
    this.expiryChangeHandler = this.expiryChangeHandler.bind(this);
    this.optionSubmitHandler = this.optionSubmitHandler.bind(this);
    this.constructOptionObjAndPassUp = this.constructOptionObjAndPassUp.bind(this);
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
    this.setState({partialSymbol: this.state.symbol});
  }

  constructOptionObjAndPassUp (partialOptionObj) {
    partialOptionObj.expiry = this.state.expiry;
    this.props.addToExamineList(partialOptionObj);
  }

  render () {
    const optionRow = this.props.optionChain
    .sort((a, b) => a._strike - b._strike)
    .map((row) => 
    (<OptionChainRow
      key={row._strike}
      call={row._call}
      callLast={row._call._last}
      callChange={row._call._change}
      callVol={row._call._vol}
      callBid={row._call._bid}
      callAsk={row._call._ask}
      callOpenInt={row._call._openInt}
      strike={row._strike}
      put={row._put}
      putLast={row._put._last}
      putChange={row._put._change}
      putVol={row._put._vol}
      putBid={row._put._bid}
      putAsk={row._put._ask}
      putOpenInt={row._put._openInt}
      constructOptionObjAndPassUp={this.constructOptionObjAndPassUp}  
    />))

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
          <select onChange={this.expiryChangeHandler} value={this.state.expiry}>
            <option value="2018-04-20">April-20-2018</option>
            <option value="2018-04-27">April-27-2018</option>
          </select>
          <input type="submit" value="Add"/>
        </form>

        <table>
          <thead className='OptionChainHeader'>
            <tr>
              <th className='OptionChainHeader'></th>
              <th className='OptionChainHeader'>Last</th>
              <th className='OptionChainHeader'>Change</th>
              <th className='OptionChainHeader'>Vol</th>
              <th className='OptionChainHeader'>Bid</th>
              <th className='OptionChainHeader'>Ask</th>
              <th className='OptionChainHeader'>Open Int.</th>
              <th className='OptionChainHeader'>Strike</th>
              <th className='OptionChainHeader'>Last</th>
              <th className='OptionChainHeader'>Change</th>
              <th className='OptionChainHeader'>Vol</th>
              <th className='OptionChainHeader'>Bid</th>
              <th className='OptionChainHeader'>Ask</th>
              <th className='OptionChainHeader'>Open Int.</th>
              <th></th>
            </tr>
          </thead>

          <tbody className='OptionChainRow'>
            {optionRow}
          </tbody>
        </table>  
      </div>   
    )
  }
}

OptionChain.propTypes = {
  optionChain: Proptypes.array,
  getOptionChain: Proptypes.func,
  addToExamineList: Proptypes.func,
  clickedSymbol: Proptypes.string
}