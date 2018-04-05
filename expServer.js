// import express from 'express';
const express = require('express');
const request = require('superagent');
// import request from 'superagent';
require('dotenv').config()
const app = express();

const TRADIER_ENDPOINT = 'https://sandbox.tradier.com/v1/'
const TRADIER_OPTIONS_PATH = 'markets/options/chains'
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

app.get('/', (req, res) => {
  var query = {symbol: 'goog', expiration: '2018-04-20'};
  makeTradierQuery(TRADIER_OPTIONS_PATH, query)
    .end((err, tradierResponse) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        res.type('json');
        res.send(tradierResponse.text);
      }
    });
});

app.listen(3001, () => console.log('app listening on 3001'))

