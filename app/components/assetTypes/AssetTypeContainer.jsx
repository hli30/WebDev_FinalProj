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
  }

  addToWatchList (symbol, expiry) {
    let newEntry = [symbol, expiry];
    this.setState({options: this.state.options.concat(newEntry)})
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

  render () {
    return (
      <div>
        <PriceViewContainer 
          addToWatchList={this.addToWatchList}
          watchList={this.state.watchList}
        />
      </div>   
    )
  }
}