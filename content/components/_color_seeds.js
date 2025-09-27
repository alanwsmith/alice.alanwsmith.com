class ColorSeeds {
  constructor() {
    this.seeds = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.seeds[parts[0]] = new ColorSeed(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parts[6],
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
    //    this.initSeeds();
  }

  // initSeeds() {
  //   Object.entries(this.seeds).forEach(([_, seed]) => {
  //     seed.initSeed();
  //   });
  // }

  // randomizeColorSeeds() {
  //   Object.entries(this.seeds).forEach(([_, seed]) => {
  //     seed.randomizeSeed();
  //   });
  // }
}
