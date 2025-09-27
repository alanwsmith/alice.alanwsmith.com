class Color {
  constructor(prefix, min, max, unit, minor, major, initialSeed) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.minor = minor;
    this.major = major;
    this.direction = randomInt(0, 1) === 1 ? 1 : -1;
    this.values = [];
    this.pushMinorRandomValue(initialSeed);
  }

  pushMinorRandomValue(fromValue) {
    this.values.push(
      randomShift(fromValue, this.min, this.max, this.minor, this.direction),
    );
  }

  valueString() {
    return `${this.values[this.values.length - 1]}${this.unit}`;
  }

  // currentValue() {
  //   return this.values[this.values.length - 1];
  // }

  //  updateColorVar() {
  //    console.log(this.prefix);
  //    //document.documentElement.style.setProperty(this.prefix, this.valueString());
  //  }
}
