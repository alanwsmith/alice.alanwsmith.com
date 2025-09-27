class ColorSeed {
  constructor(min, max, minor, major, huge) {
    this.setMin(min);
    this.setMax(max);
    this.setMinor(minor);
    this.setMajor(major);
    this.setHuge(huge);
    this.setDirection(
      randomInt(0, 1) === 1 ? 1 : -1,
    );
  }

  doMajorShift() {
    this.setCurrentValue(randomShift(
      this.value(),
      this.min(),
      this.max(),
      this.major(),
      this.direction,
    ));
    if (this.previousValue() > this.currentValue()) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  doMinorShift() {
    this.setCurrentValue(randomShift(
      this.value(),
      this.min(),
      this.max(),
      this.minor(),
      this.direction(),
    ));
    if (this.previousValue() > this.currentValue()) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  direction() {
    return this._direction;
  }

  generateRandomSeed() {
    this.setCurrentValue(randomInt(
      this.min(),
      this.max(),
    ));
  }

  huge() {
    return this._major;
  }

  major() {
    return this._major;
  }

  max() {
    return this._max;
  }

  min() {
    return this._min;
  }

  minor() {
    return this._minor;
  }

  setCurrentValue(value) {
    this.setPreviousValue(this.currentValue());
    this._currentValue = value;
  }

  setDirection(value) {
    this._direction = value;
  }

  setHuge(value) {
    this._major = value;
  }

  setMajor(value) {
    this._major = value;
  }

  setMax(value) {
    this._max = value;
  }

  setMin(value) {
    this._min = value;
  }

  setMinor(value) {
    this._minor = value;
  }

  setPreviousValue(value) {
    this._previousValue = value;
  }

  setCurrentValue(value) {
    this.setPreviousValue(this.currentValue());
    this._currentValue = value;
  }

  currentValue() {
    return this._currentValue;
  }
}
