const Option = require('./class/option.js');


function findStrike(strike, options) {
  return options.findIndex(element => element.strike === strike);
}

function buildOptionList(tradierList) {
  let list = tradierList;
  let optionList = [];

  for (let i = 0; i < list.length; i++) {

    let index = findStrike(list[i].strike, optionList);
    if (index >= 0) {
      if (list[i]['option_type'] === 'call') {
        optionList[index].call.last = list[i]['last'];
        optionList[index].call.change = list[i]['change'];
        optionList[index].call.vol = list[i]['vol'];
        optionList[index].call.bid = list[i]['bid'];
        optionList[index].call.ask = list[i]['ask'];
        optionList[index].call.openInt = list[i]['open_interest'];
        optionList[index].call.symbol = list[i]['symbol'];
      } else {
        optionList[index].put.last = list[i]['last'];
        optionList[index].put.change = list[i]['change'];
        optionList[index].put.vol = list[i]['vol'];
        optionList[index].put.bid = list[i]['bid'];
        optionList[index].put.ask = list[i]['ask'];
        optionList[index].put.openInt = list[i]['open_interest'];
        optionList[index].put.symbol = list[i]['symbol'];
      }
      // console.log(`Found an existing option: ${optionList[index]}`);
    } else {
      let newOption = new Option(list[i]['strike']);

      if (list[i]['option_type'] === 'call') {
        newOption.call.last = list[i]['last'];
        newOption.call.change = list[i]['change'];
        newOption.call.vol = list[i]['vol'];
        newOption.call.bid = list[i]['bid'];
        newOption.call.ask = list[i]['ask'];
        newOption.call.openInt = list[i]['open_interest'];
        newOption.call.symbol = list[i]['symbol'];
      } else {
        newOption.put.last = list[i]['last'];
        newOption.put.change = list[i]['change'];
        newOption.put.vol = list[i]['vol'];
        newOption.put.bid = list[i]['bid'];
        newOption.put.ask = list[i]['ask'];
        newOption.put.openInt = list[i]['open_interest'];
        newOption.put.symbol = list[i]['symbol'];
      }
      optionList.push(newOption);
    }
  }
  return optionList;
}

module.exports.buildOptionList = buildOptionList;  
