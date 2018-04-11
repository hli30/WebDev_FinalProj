
class optionType {
    constructor(value){
      this.type = value;
      this.symbol = '';
      this.last = 0;
      this.change = 0;
      this.vol = 0;
      this.bid = 0;
      this.ask = 0;
      this.openInt = 0;

    }

    get type() {
      return this._type;
    }

    set type(value) {
      this._type = value;
    }

    get symbol() {
      return this._symbol;
    }
      
    set symbol(value) {
      this._symbol = value;
    } 
  
    get last() {
      return this._last;
    }
  
    set last(value) {
      this._last = value;
    }
  
    get change() {
      return this._change;
    }
  
    set change(value) {
      this._change = value;
    }
   
    get vol() {
      return this._vol;
    }
  
    set vol(value) {
      this._vol = value;
    }
  
    get bid() {
      return this._bid;
    }
  
    set bid(value) {
      this._bid = value;
    }
  
    get ask() {
      return this._ask;
    }
  
    set ask(value) {
      this._ask = value;
    }
  
    get openInt() {
      return this._openInt;
    }
  
    set openInt(value) {
      this._openInt = value;
    }

  }
  
  class Option {
    constructor (value) {
      this.call = new optionType('Call');
      this.put = new optionType('Put');
      this.strike = value;
      
    }
  
    get strike() {
      return this._strike;
    }
  
    set strike(value) {
      this._strike = value;
    }   

    get put() {
      return this._put;
    }

    set put(value) {
      this._put = value;
    }

    get call() {
      return this._call;
    }

    set call(value) {
      this._call = value;
    }
  }
  module.exports = Option;