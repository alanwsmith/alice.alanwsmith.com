class ColorSeed {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.direction = randomInt(0, 1) === 1 ? 1 : -1;
    this.currentValue = randomInt(this.min, this.max);
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
    if (this.previousValue > this.currentValue) {
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
      this.direction,
    );
    if (this.previousValue > this.currentValue) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  doRandomShift() {
    this.previousValue = this.currentValue;
    this.currentValue = randomInt(
      this.min,
      this.max,
    );
  }

  setDirection(value) {
    this.direction = value;
  }

  setValue(value) {
    this.previousValue = this.currentValue;
    this.currentValue = value;
  }

  value() {
    return this.currentValue;
  }
}
