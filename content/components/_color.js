class Color {
  constructor(prefix, min, max, unit, minor, major, colorSeeds) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.minor = minor;
    this.major = major;
    this.colorSeed = colorSeeds[this.prefix];
    this.currentValue = null;
    this.previousValue = null;
    this.setMinorRandomValueFromSeed();
  }

  setValue(value) {
    this.previousValue = this.currentValue;
    this.currentValue = value;
  }

  setMinorRandomValueFromSeed() {
    this.previousValue = this.currentValue;
    this.currentValue = randomShift(
      this.colorSeed.value(),
      this.min,
      this.max,
      this.minor,
      randomInt(0, 1) === 1 ? 1 : -1,
    );
  }

  value() {
    return this.currentValue;
  }

  valueString() {
    return `${this.currentValue}${this.unit}`;
  }
}
