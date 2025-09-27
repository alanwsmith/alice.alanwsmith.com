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

  value() {
    return this.currentValue;
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
      this.direction = -1;
    } else {
      this.direction = 1;
    }

    if (this.prefix === "color-h") {
      console.log(`${this.prefix} - Direction: ${this.direction}`);
    }

    //this.updateDirection();
  }

  // updateDirection() {
  //   if (this.directionCount > 7) {
  //     this.directionCount = 0;
  //     this.direction *= -1;
  //   } else {
  //     this.directionCount += 1;
  //   }
  // }
}
