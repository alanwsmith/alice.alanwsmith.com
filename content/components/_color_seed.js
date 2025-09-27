class ColorSeed {
  constructor(min, max, minor, major) {
    this.setMin(min);
    this.setMax(max);
    this.minor(minor);
    this.major(major);
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
    this.previousValue = this.currentValue;
    this.currentValue = randomShift(
      this.value(),
      this.min(),
      this.max(),
      this.minor(),
      this.direction(),
    );
    if (this.previousValue > this.currentValue) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  generateRandomSeed() {
    this.previousValue = this.currentValue;
    this.currentValue = randomInt(
      this.min(),
      this.max(),
    );
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

  setValue(value) {
    this.previousValue = this.currentValue;
    this.currentValue = value;
  }

  value() {
    return this.currentValue;
  }
}
