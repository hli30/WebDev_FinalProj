
const USER_ID = 1; // this will be removed when we have a valid user logging in and out
const express = require('express');
const request = require('superagent');
const optionList = require('./src/optionList');

require('dotenv').config();
const ENV = process.env.ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

const bodyParser = require('body-parser');

const app = express();

const TRADIER_ENDPOINT = 'https://sandbox.tradier.com/v1/';
const TRADIER_OPTIONS_PATH = 'markets/options/chains';
const TRADIER_QUOTES_PATH = 'markets/quotes';
const REQ_HEADER_OPTIONS = {
  Authorization: 'Bearer ' + process.env.TRADIER_TOKEN,
  Accept: 'application/json'
};


/**********
 * HELPERS
 **********/
const makeTradierQueryAndSendData = (res, path, query, type) => {
  request
    .get(TRADIER_ENDPOINT + path)
    .query(query)
    .set('Authorization', REQ_HEADER_OPTIONS.Authorization)
    .set('Accept', REQ_HEADER_OPTIONS.Accept)
    .end((err, tradierResponse) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        let data = JSON.parse(tradierResponse.text);
        let cleanData = filterAndCleanData(data, type);
        res.status(200).send(cleanData);
      }
    });
}

//Pull out specific data needed for front-end from api call, 
//and round numbers to two decimals
const filterAndCleanData = (incData, type) => {
  let cleanArr;
  let cleanObj;
  let data;
  if (type === 'optionChain') {
    data = incData.options.option;
  } else {
    data = incData.quotes.quote;
  }

  switch (type) {
    case 'stock':
      cleanObj = roundAndReturnDataObj({
        price: data.last, 
        change: data.change,
        pctChange: data.change_percentage
      });
      cleanObj.symbol = data.symbol;
      cleanArr = [cleanObj];
      break;
    case 'stockArr':
      cleanArr = data.map(({symbol, last, change, change_percentage}) => {
        cleanObj = roundAndReturnDataObj({price: last, change, pctChange: change_percentage})
        cleanObj.symbol = symbol;
        return cleanObj;
      });
      break;
    case 'option':
      cleanObj = roundAndReturnDataObj({
        bid: data.bid,
        ask: data.ask
      })
      cleanObj.description = data.description;
      cleanObj.type = data.option_type;
      cleanObj.strike = data.strike;
      cleanObj.expiry = data.expiration_date;
      cleanArr = [cleanObj];
      break;
    case 'optionArr':
      cleanArr = data.map(({description, bid, ask, option_type, strike, expiration_date}) => {
        cleanObj = roundAndReturnDataObj({bid, ask});
        cleanObj.description = description;
        cleanObj.type = option_type;
        cleanObj.strike = strike;
        cleanObj.expiry = expiration_date;
        return cleanObj;
      });
      break;
    case 'optionChain':
      cleanArr = data.map(({option_type, strike, symbol, last, change, vol, bid, ask, open_interest}) => {
        cleanObj = roundAndReturnDataObj({last, change, vol, bid, ask, open_interest})
        cleanObj.option_type = option_type;
        cleanObj.strike = strike;
        cleanObj.symbol = symbol;
        return cleanObj;
      });
      return optionList.buildOptionList(cleanArr);
  }
  return cleanArr;
}

//Round numbers to two decimal places
const roundAndReturnDataObj = (dataObj) => {
  let cleanObj = {};
  for (let key in dataObj) {
    if (typeof(dataObj[key]) === 'number') {
      cleanObj[key] = Math.round(dataObj[key]*100)/100
    }
  }
  return cleanObj;
}

const buildQueryStringForMultipleSymbols = (data) => {  
  let queryString = '';
  for (let elm of data) {
    if (queryString) {
      queryString += ',';
    }
    queryString += elm.symbol;
  }
  return queryString;
}

/**********
 * MIDDLEWARE
 **********/
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**********
 * GET
 **********/
app.get('/symbol', (req, res) => {
  let queryString;
  knex.select('symbol')
    .from('watch_lists')
    .where({user_id: USER_ID})
    .then(rows => queryString = buildQueryStringForMultipleSymbols(rows))
    .then(() => {
      const query = {symbols: queryString};
      const type = 'stockArr';
      makeTradierQueryAndSendData(res, TRADIER_QUOTES_PATH, query, type);
    })
    .catch((err) => console.log(err.message));

});

app.get('/examine', (req, res) => {
  let queryString;
  knex.select('symbol')
    .from('examine_lists')
    .where({user_id: USER_ID})
    .then(rows => queryString = buildQueryStringForMultipleSymbols(rows))
    .then(() => {
      const query = {symbols: queryString};
      const type = 'optionArr';
      makeTradierQueryAndSendData(res, TRADIER_QUOTES_PATH, query, type);
    })
    .catch((err) => console.log(err.message));
});

/**********
 * POST
 **********/
app.post('/option', (req, res) => {
  const query = {symbol: req.body.symbol, expiration: req.body.expiry};
  const type = 'optionChain';
  makeTradierQueryAndSendData(res, TRADIER_OPTIONS_PATH, query, type);
});

app.post('/symbol', (req, res) => {
  const query = {symbols: req.body.symbol};
  const type = 'stock';
  knex('watch_lists')
    .insert({user_id: USER_ID, symbol: req.body.symbol})
    .catch((err) => console.log(err.message));
  makeTradierQueryAndSendData(res, TRADIER_QUOTES_PATH, query, type);
});

app.post('/examine', (req, res) => {
  const query = {symbols: req.body.symbol};
  const type = 'option';
  knex('examine_lists')
    .insert({user_id: USER_ID, symbol: req.body.symbol})
    .catch((err) => console.log(err.message));
  makeTradierQueryAndSendData(res, TRADIER_QUOTES_PATH, query, type);
});

app.listen(3001, () => console.log('app listening on 3001'));
