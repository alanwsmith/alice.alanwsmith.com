class ColorSeed {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.direction = randomInt(0, 1) === 1 ? 1 : -1;
    this.values = [];
    this.pushRandomSeed();
  }

  value() {
    return this.values[this.values.length - 1];
  }

  pushRandomSeed() {
    this.values.push(randomInt(this.min, this.max));
  }

  doMinorShift() {
    this.values.push(
      randomShift(
        this.value(),
        this.min,
        this.max,
        this.minor,
        this.direction,
      ),
    );
    console.log(this.values);
  }
}
