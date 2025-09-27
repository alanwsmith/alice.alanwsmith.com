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
        parseInt(parts[9]),
      );
    });
  }

  doMinorSeedsShift() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.doMinorSeedShift();
    });
  }

  doMajorSeedsShift() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.doMajorSeedShift();
    });
  }

  generateSeeds(key) {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.generateSeed(key);
    });
  }
}
