class Prop {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}

class PropSeeds {
  constructor() {
    propSet.forEach((line) => {
      const parts = line.split("|");
      this[parts[0]] = new PropSeed(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
  }
}

class PropSeed {
  constructor(key, min, max, minor, major) {
    this.prefix = key;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}
