const express = require('express');
const request = require('superagent');
const optionList = require('./src/optionList');

require('dotenv').config();
const ENV = process.env.ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

const bodyParser = require('body-parser');

const app = express();

const TRADIER_ENDPOINT = 'https://sandbox.tradier.com/v1/'
const TRADIER_OPTIONS_PATH = 'markets/options/chains'
const TRADIER_QUOTES_PATH = 'markets/quotes'
const REQ_HEADER_OPTIONS = {
  Authorization: 'Bearer ' + process.env.TRADIER_TOKEN,
  Accept: 'application/json'
}

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

app.get('/symbol/:ticker', (req, res) => {

  knex.select('symbol')
    .from('watch_lists')
    .where({user_id: 1})
    .then(function(rows) {
      for (let row in rows) {
        makeTradierQuery(TRADIER_QUOTES_PATH, row.symbol)
          .end((err, tradierResponse) => {
            if (err) {
              res.status(500).send('Error');
            } else {
              res.status(200).type('json').send(tradierResponse.text);
            }
          })        
      }
    })
    .catch(function(error) { console.error(error); });

});

app.post('/symbol/:ticker', (req, res) => {
  const query = {symbols: req.params.ticker};
  // watchList.addToWatchList(1,req.params.ticker);
  knex('watch_lists').insert({user_id: 1, symbol: req.params.ticker}).then(function (id) {
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

app.listen(3001, () => console.log('app listening on 3001'));
