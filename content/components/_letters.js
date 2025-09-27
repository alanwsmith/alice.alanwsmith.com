class Letters {
  constructor() {
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
    await sleep(200);
    this.applyAllColors();
    // await sleep(1600);
    // this.updateAlice();
  }

  setMinorColorUpdatesFromSeeds() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.setMinorColorUpdateFromSeeds();
    });
  }

  updateAlice() {
    this.colorSeeds.doMinorShift();
    this.setMinorColorUpdatesFromSeeds();
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
