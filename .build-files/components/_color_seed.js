class ColorSeed {
  constructor(min, max, minor, major) {
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this._currentValue = null;
    this._previousValue = null;
    this.setDirection(
      randomInt(0, 1) === 1 ? 1 : -1,
    );
  }

  doMajorShift() {
    this.previousValue = this.currentValue;
    this.currentValue = randomShift(
      this.value(),
      this.min,
      this.max,
      this.major,
      this.direction,
    );
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
      this.min,
      this.max,
      this.minor,
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
      this.min,
      this.max,
    );
  }

  setDirection(value) {
    this._direction = value;
  }

  setCurrentValue(value) {
    this.setPreviousValue(this.currentValue());
    this._currentValue = value;
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
