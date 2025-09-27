class ColorSeed {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
    this.pushRandomSeed();
  }

  value() {
    return this.moves[this.moves.length - 1];
  }

  pushRandomSeed() {
    this.moves.push(randomInt(this.min, this.max));
  }
}
