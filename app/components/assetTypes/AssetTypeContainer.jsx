import React, {Component} from 'react';
import PriceViewContainer from './option/main/PriceViewContainer.jsx';
import StratViewContainer from './option/main/StratViewContainer.jsx';
import request from 'superagent';

export default class AssetTypeContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      watchList: [],
      options:[],
      examineList:[]
    }
    this.addToWatchList = this.addToWatchList.bind(this);
    this.getOptionChain = this.getOptionChain.bind(this);
    this.addToExamineList = this.addToExamineList.bind(this);
  }

  addToWatchList (symbol) {
    request
      .post('http://localhost:3001/symbol')
      .send({symbol})
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
      .send({symbol, expiry})
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text);
          this.setState({options: data});
        }
      });
  }

  addToExamineList (symbol) {
    console.log(symbol);
    request
      .post('http://localhost:3001/examine')
      .send({symbol})
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text).quotes.quote;
          
          const description = data.description
          const bid = data.bid
          const ask = data.ask
          const newRow = {description, bid, ask};

          this.setState({examineList: this.state.examineList.concat(newRow)})
        }
      });
  }

  componentDidMount () {
    request
      .get('http://localhost:3001/symbol')
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text).quotes.quote;
          if (!Array.isArray(data)) {
            this.setState({watchList: [data]});
          } else {
            const newArray = data.map(({symbol, last, change, change_percentage}) => {
              return {symbol, price: last, change, pctChange: change_percentage};       
            });
            this.setState({watchList: newArray});
          }
        }
      });

    request
      .get('http://localhost:3001/examine')
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text).quotes.quote;
          if (!Array.isArray(data)) {
            this.setState({examineList: [data]});
          } else {
            const newArray = data.map(({description, bid, ask}) => {
              return {description, bid, ask}
            });
            this.setState({examineList: newArray});
          }
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
          addToExamineList={this.addToExamineList}
          examineList={this.state.examineList}
        />
        {/* <StratViewContainer
          examineList={this.state.examineList}
        /> */}
      </div>
    )
  }
}