import React, {Component} from 'react';
import PriceViewContainer from './option/main/PriceViewContainer.jsx';
import request from 'superagent';

export default class AssetTypeContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      watchList: [],
      options:[]
    }
    this.addToWatchList = this.addToWatchList.bind(this);
    this.getOptionChain = this.getOptionChain.bind(this);
  }

  addToWatchList (symbol) {
    request
      .get('http://localhost:3001/symbol/' + symbol)
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text);

          const symbol = data.quotes.quote.symbol;
          const price = data.quotes.quote.last;
          const change = data.quotes.quote.change;
          const pctChange = data.quotes.quote.change_percentage;
          const newRow = {symbol, price, change, pctChange};
          this.setState({watchList: this.state.watchList.concat(newRow)});
        }
      });
  }

  getOptionChain (symbol, expiry) {
    request
      .post('http://localhost:3001/option')
      .send({symbol: symbol, expiry: expiry})
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text);
          console.log("dlen", data.length);
          this.setState({options: data});
        }
      });
  }

  render () {
    return (
      <div>
        <PriceViewContainer 
          addToWatchList={this.addToWatchList}
          getOptionChain={this.getOptionChain}
          watchList={this.state.watchList}
          optionChain={this.state.options}
        />
      </div>   
    )
  }
}