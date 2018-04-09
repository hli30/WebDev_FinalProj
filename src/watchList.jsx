const ENV = process.env.ENV || 'development';
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);


const addToWatchList = (userID, symbol) => {
  knex('watchLists').insert({user_id: userID, symbol: symbol})
}

const readFromWatchList = (userID) => {
  return knex('watchLists').where('id', userID);
}

module.exports.addToWatchList = addToWatchList;
module.exports.readFromWatchList = readFromWatchList;