class Letters {
  constructor() {
    this.delays = {
      "xsmall": 200,
      "small": 500,
      "default": 1000,
      "large": 1500,
      "xlarge": 2000,
    };
    this.colorSeeds = new ColorSeeds();
    this.propSeeds = new PropSeeds();
    this.letters = {};
    letters().forEach((letter) => {
      this.letters[letter] = new Letter(
        letter,
        this.colorSeeds,
        this.propSeeds,
      );
    });
  }

  async init() {
    this.colorSeeds.doMinorShift();
    await sleep(this.delays.xsmall);
    this.setAllColorDelays(this.delays.default);
    this.applyAllColors();
    await sleep(this.delays.default);

    this.updateAlice();
  }

  setMinorColorUpdatesFromSeeds() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.setMinorColorUpdateFromSeeds();
    });
  }

  setAllColorDelays(ms) {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.setColorDelay(ms);
    });
  }

  async updateAlice() {
    this.colorSeeds.doMinorShift();
    this.setMinorColorUpdatesFromSeeds();
    this.applyAllColors();
    await sleep(this.delays.default);
    this.updateAlice();
    //this.letters["A"].applyColor();
  }

  async shiftThingsAround() {
    // this.updateLetterColorsWithSeed();
    this.updateVarsForLetters();
    // this.shiftThingsAround();
  }

  async doBasicUpdate() {
    this.colorSeeds.doMinorShift();
  }

  addBaseStyles() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];
  }

  applyAllColors() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.applyColor();
    });
  }
}
