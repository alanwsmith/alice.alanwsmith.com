class ColorSeeds {
  constructor() {
    this.seeds = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.seeds[parts[0]] = new ColorSeed(
        parseInt(parts[2]),
        parseInt(parts[3]),
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
  }

  doMinorShift() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.doMinorShift();
    });
  }

  doMajorShift() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.doMajorShift();
    });
  }

  generateRandomSeeds() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.generateRandomSeed();
    });
  }

  prefixes() {
    return Object.entries(this.seeds).map(([prefix, _]) => {
      return prefix;
    });
  }
}
