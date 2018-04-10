Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = '0' + s;}
  return s;
}

class OptionSymbol {
  constructor(rootSymbol, expiry, strikePrice, option) {
    this.rootSymbol = rootSymbol;
    this.expiryDate = expiry;
    this.strikePrice = strikePrice;
    this.option = option;
  }

  get rootSymbol() {
    return this._rootSymbol;
  }
    
  set rootSymbol(value) {
    this._rootSymbol = value;
  }

  get expiryDate() {
    return this._expiryDate;
  }
    
  set expiryDate(value) {
    const d = new Date(value);
    const dd = d.getDate().pad(2);
    const mm = (d.getMonth() + 1).pad(2);
    const yy = d.getFullYear().toString().substr(2,3);
    this._expiryDate = yy+mm+dd;
  }
  
  get strikePrice() {
    return this._strikePrice;
  }
    
  set strikePrice(value) {
    this._strikePrice = value;
  }

  get option() {
    return this._option;
  }

  set option(value) {
    this._option = value[0];
  }
    
  set fromFullSymbol(fullSymbol){
    this.rootSymbol = fullSymbol.substr(0,5);
    this.expiryDate = fullSymbol.substr(6, 11);
    this.strikePrice = Number(fullSymbol.substr(13, 20)) / 1000;
  }

  get fullSymbol() {
    return this.rootSymbol + this.expiryDate + this.option + (this.strikePrice * 1000).pad(8);
  }
}

module.exports = OptionSymbol;