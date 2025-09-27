class Letters {
  constructor() {
    this.delays = {
      "xxsmall": 300,
      "xsmall": 500,
      "small": 1500,
      "default": 4000,
      "large": 6500,
      "xlarge": 12000,
    };
    this.initLetters();
    this.colorSeeds = new ColorSeeds();
  }

  initLetters(colorSeeds) {
    this.letters = {};
    chars().forEach((char) => {
      this.letters[char] = new Letter(
        char,
      );
    });
  }

  listOfChars() {
    return Object.entries(this.letters).map(([char, _]) => char);
  }

  listOfColorPrefixes() {
    return Object.entries(this.colorSeeds.seeds).map(([prefix, _]) => prefix);
  }

  async start() {
    this.colorSeeds.generateRandomSeeds();
    this.setMinorColorPrefixesFromSeedsForEveryChar();
    this.applyColorPrefixes();
    await sleep(this.delays.xsmall);
    //  this.baselineUpdate();
  }

  minorShiftFromSeed(prefix) {
    const seed = this.colorSeeds.seeds[prefix];
    const value = randomShift(
      seed.currentValue(),
      seed.min(),
      seed.max(),
      seed.minor(),
      seed.direction(),
    );
    console.log(value);
    return value;
  }

  setMinorColorPrefixesFromSeedsForEveryChar() {
    const updates = [];
    this.listOfChars().forEach((char) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        const value = this.minorShiftFromSeed(prefix);
        updates.push([char, {
          [prefix]: value,
        }]);
      });
    });
    this.setUpdates(updates);
  }

  async baselineUpdate() {
    this.setUpdates(
      {
        "A": {
          "color-transision": 100,
          "color-l": randomInt(30, 80),
          "color-c": randomInt(30, 80),
          "color-h": randomInt(30, 80),
        },
      },
    );
    this.applyUpdates();
    await sleep(this.delays.default);
    this.changePicker();
  }

  setUpdates(payload) {
    payload.forEach(([char, details]) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        if (details[prefix] !== undefined) {
          this.letters[char].setColorPrefix(prefix, details[prefix]);
        }
      });
    });
  }

  applyColorPrefixes() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.applyColorPrefixes();
    });
  }

  async changePicker() {
    [
      this.baselineUpdate.bind(this),
      //     this.updateAlice.bind(this),
      //      this.makeMonochrome.bind(this),
    ][0]();
  }

  // async makeMonochrome() {
  //   this.setEveryColorDelay(this.delays.default);
  //   this.setEveryColor("color-c", 2);
  //   this.applyAllColors();
  //   await sleep(this.delays.default);
  // }

  // setSingleColorDelay(char, value) {
  //   this.letters[char].setColorDelay(value);
  // }

  // setEveryColor(prefix, value) {
  //   this.letterArray().forEach((letter) => {
  //     this.setIndividualColor(letter, prefix, value);
  //   });
  // }

  // setIndividualColor(letter, prefix, value) {
  //   letter.setColor(prefix, value);
  // }

  async updateAlice() {
    // this.colorSeeds.doMinorShift();
    // this.setMinorColorUpdatesFromSeeds();
    // this.applyAllColors();
    // await sleep(this.delays.default);
    // this.changePicker();
  }

  setMinorColorUpdatesFromSeeds() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      // letter.setMinorColorUpdateFromSeeds();
    });
  }

  setEveryColorDelay(ms) {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.setColorDelay(ms);
    });
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

// // TODO: I don't know about this one.
// async initialUpdate() {
//   const localDelay = this.delays.xsmall;
//   this.colorSeeds.doMinorShift();
//   this.setSingleColorDelay("A", localDelay);
//   this.applySingleColor("A");
//   await sleep(localDelay);
//   this.setSingleColorDelay("L", localDelay);
//   this.applySingleColor("L");
//   await sleep(localDelay);
//   this.setSingleColorDelay("I", localDelay);
//   this.applySingleColor("I");
//   await sleep(localDelay);
//   this.setSingleColorDelay("C", localDelay);
//   this.applySingleColor("C");
//   await sleep(localDelay);
//   this.setSingleColorDelay("E", localDelay);
//   this.applySingleColor("E");
//   await sleep(localDelay);
//   this.applyAllColors();
//   await sleep(this.delays.xlarge);
//   this.changePicker();
// }
