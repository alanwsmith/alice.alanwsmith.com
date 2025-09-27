class ColorSeed {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
    this.moves.push(randomInt(this.min, this.max));
  }

  currentSeed() {
    return this.moves[this.moves.length - 1];
  }

  randomizeSeed() {
    //
  }
}
