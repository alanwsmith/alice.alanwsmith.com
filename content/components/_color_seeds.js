class ColorSeeds {
  constructor() {
    this.seeds = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.seeds[parts[0]] = new ColorSeed(
        parts[0],
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

  doRandomShift() {
    Object.entries(this.seeds).forEach(([_, seed]) => {
      seed.doRandomShift();
    });
  }
}
