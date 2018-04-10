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
    this._expiryDate = value;
  }
  
  get strikePrice() {
    return this._strikePrice;
  }
    
  set strikePrice(value) {
    this._strikePrice = value;
  }
    
  set fromFullSymbol(fullSymbol){
    this.rootSymbol = fullSymbol.substr(0,5);
    this.expiryDate = fullSymbol.substr(6, 11);
    this.strikePrice = Number(fullSymbol.substr(13, 20)) / 1000;
  }

  get fullSymbol() {
    return this.rootSymbol + this.expiryDate + this.option + (this.strikePrice * 1000).toString().padString(8,'0');
  }
}

module.exports = OptionSymbol;