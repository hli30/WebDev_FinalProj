
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

const makeTradierQuery = (path, q) => {
  return request
    .get(TRADIER_ENDPOINT + path)
    .query(q)
    .set('Authorization', REQ_HEADER_OPTIONS.Authorization)
    .set('Accept', REQ_HEADER_OPTIONS.Accept);
}

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/option', (req, res) => {
  const query = {symbol: req.body.symbol, expiration: req.body.expiry};
  console.log(query);
  makeTradierQuery(TRADIER_OPTIONS_PATH, query)
    .end((err, tradierResponse) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        res.type('json').send(optionList.buildOptionList(tradierResponse.text));
      }
    });
});

app.get('/symbol', (req, res) => {
  let tempString = '';
  knex.select('symbol')
    .from('watch_lists')
    .where({user_id: USER_ID})
    .then(function(rows) {
      for (let row of rows) {
        if (tempString) {
          tempString += ',';
        }
        tempString += row.symbol;
      }
    })
    .then(function() {
      const query = {symbols: tempString};
      makeTradierQuery(TRADIER_QUOTES_PATH, query)
        .end((err, tradierResponse) => {
          if (err) {
            res.status(500).send('Error');
          } else {
            res.status(200).type('json').send(tradierResponse.text);
            // console.log(tradierResponse.text);
            // console.log(JSON.parse(tradierResponse.text));
          }
        });
    })
    .catch(function(error) { console.error(error); });

});

app.get('/examine', (req, res) => {
  let examine = [];
  knex.select('fullSymbol')
    .from('examine_lists')
    .where({user_id: USER_ID})
    .then(function(rows) {
      for (let row of rows) {
        examine.push(row.fullSymbol);
      }
    })
    .then(function() {
      console.log(examine[0].fullSymbol)
      //const query = {symbols: tempString};
      // makeTradierQuery(TRADIER_QUOTES_PATH, query)
      //   .end((err, tradierResponse) => {
      //     if (err) {
      //       res.status(500).send('Error');
      //     } else {
      //       res.status(200).type('json').send(tradierResponse.text);
            // console.log(tradierResponse.text);
            // console.log(JSON.parse(tradierResponse.text));
        //   }
        // });
    })
    .catch(function(error) { console.error(error); });

});


app.post('/symbol/:ticker', (req, res) => {
  const query = {symbols: req.params.ticker};
  knex('watch_lists').insert({user_id: USER_ID, symbol: req.params.ticker}).then(function (id) {
    console.log(id);
  });
  makeTradierQuery(TRADIER_QUOTES_PATH, query)
    .end((err, tradierResponse) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        res.status(200).type('json').send(tradierResponse.text);
      }
    })
});

app.post('/examine', (req, res) => {
  console.log (req.body.option.symbol);
  knex('examine_lists')
    .insert({user_id: USER_ID, fullSymbol: req.body.option.symbol})
    .then(function (id) {
      console.log(id);
    });
  res.render('/examine');
});

app.listen(3001, () => console.log('app listening on 3001'));
