class OptionSymbol {
  constructor(rootSymbol, expiry, strikePrice) {
    this.rootSymbol = rootSymbol;
    this.expiryDate = expiry;
    this.strikePrice = strikePrice;
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
    
  get fullCallSymbol() {
    return this.rootSymbol + this.expiryDate + 'C' + (this.strikePrice * 1000).toString();
  }

  get fullPutSymbol() {
    return this.rootSymbol + this.expiryDate + 'P' + (this.strikePrice * 1000).toString();
  }
}

module.exports = OptionSymbol;