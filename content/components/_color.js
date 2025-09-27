class Color {
  constructor(prefix, min, max, unit, minor, major, colorSeeds) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.minor = minor;
    this.major = major;
    this.colorSeed = colorSeeds[this.prefix];
    this.direction = randomInt(0, 1) === 1 ? 1 : -1;
    this.values = [];
    this.pushMinorRandomValueFromSeed();
  }

  pushMinorRandomValueFromSeed() {
    // console.log(`${this.colorSeed.value()} ${this.minor}`);
    this.values.push(
      randomShift(
        this.colorSeed.value(),
        this.min,
        this.max,
        this.minor,
        this.direction,
      ),
    );
  }

  value() {
    return `${this.values[this.values.length - 1]}${this.unit}`;
  }
}
