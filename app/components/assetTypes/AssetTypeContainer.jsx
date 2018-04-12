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

  componentDidMount () {
    request
      .get('http://localhost:3001/symbol')
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text);
          this.setState({watchList: data});
        }
      });

    request
      .get('http://localhost:3001/examine')
      .end((err, res) => {
        if (err) {
          console.log(err.message);
        } else {
          const data = JSON.parse(res.text);
          this.setState({examineList: data});
        }
      });
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
          this.setState({watchList: this.state.watchList.concat(data)});
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
          const data = JSON.parse(res.text);
          this.setState({examineList: this.state.examineList.concat(data)})
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