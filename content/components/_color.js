class ColorSeeds {
  constructor() {
    console.log("---");
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.seeds = {};
      this.seeds[parts[0]] = new ColorSeed(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parts[6],
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
    this.randomizeColorSeeds();
  }

  randomizeColorSeeds() {
    //  console.log("asdf");
  }
}

class ColorSeed {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}

class Color {
  constructor(prefix, min, max, unit, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}
