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
      .post('http://localhost:3001/symbol/' + symbol)
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
          console.log(newRow);
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

  addToExamineList (option) {
    console.log('add to examine' + JSON.stringify(option));
    // request
    //   .post('http://localhost:3001/examine')
    //   .send({option})
    //   .end((err, res) => {
    //     if (err) {
    //       console.log(err.message);
    //     } else {
    //       //gets the option moded symbol
    //       const data = JSON.parse(res.text);
    //       this.setState({examineList: this.state.options.concat(data)})
    //     }
    //   });
  }

  componentDidMount () {
    request
      .get('http://localhost:3001/symbol')
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const dataArray = JSON.parse(res.text).quotes.quote;
          const newArray = dataArray.map(({symbol, last, change, change_percentage}) => {
            return {symbol, price: last, change, pctChange: change_percentage};       
          });
          this.setState({watchList: newArray});
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