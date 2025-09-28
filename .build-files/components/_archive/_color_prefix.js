class ColorPrefix {
  constructor(unit) {
    this._unit = unit;
    this._currentValue = null;
    this._previousValue = null;
  }

  currentValueString() {
    return `${this.currentValue()}${this.unit()}`;
  }

  currentValue() {
    return this._currentValue;
  }

  setCurrentValue(value) {
    this.setPreviousValue = this.currentValue();
    this._currentValue = value;
  }

  setPreviousValue(value) {
    this._previousValue = value;
  }

  unit() {
    return this._unit;
  }
}
