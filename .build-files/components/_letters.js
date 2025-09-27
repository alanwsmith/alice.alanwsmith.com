class Letters {
  constructor() {
    this._delays = {
      "xxsmall": 300,
      "xsmall": 600,
      "small": 1400,
      "default": 4000,
      "large": 6500,
      "xlarge": 12000,
    };
    this.setCurrentDelay("default");
    this.initLetters();
    this.colorSeeds = new ColorSeeds();

    this.testDelay = async () => {
      await this.doDelay();
    };

    this.collections = {
      first: [
        this.setDelay.bind(this, "xsmall"),
        this.prepRandomSeeds.bind(this),
        this.loadMajorColorPrefixesFromSeedsForEveryChar.bind(this),
        this.doDelay,
        this.applyUpdates.bind(this),
      ],
    };
  }

  async runCollection(key = "random") {
    if (key === "random") {
      key = "first"; // TODO: make random when there's other stuff
    }

    // this.collections[key].forEach(async (update) => {
    //   await update();
    // });

    for (let update of this.collections[key]) {
      await update();
    }

    // const werwer = this.collections[key].map((func) => (...args) => {
    //   console.log("asdf");
    //   Promise.resolve(func(...args));
    // });
    // werwer;

    // const asdf = this.collections[key].map((func) => {
    //   // console.log(func);
    //   (async (...args) => {
    //     return await func.apply(...args);
    //   });
    // });

    // asdf;

    // for (let update of this.collections[key]) {
    //   async function () {
    //     update.apply(this);
    //   };
    // }

    // const aF = this.collections[key].map((func) => {
    //   (async () => {
    //     return await func();
    //   });
    // });

    //for (let update of this.collections[key]) {
    //  const x = async function () {
    //    await update;
    //  };
    //  x;
    //  //update();
    //  // async function() {
    //  //   return await update()
    //  // }
    //}

    //// console.log(`Running collection: ${key}`);
    //this.collections[key].forEach((update) => {
    //  this.doDelay();
    //  update();
    //  //const result = await update();
    //  // update();
    //  // console.log(update);
    //});
  }

  async doDelay() {
    await sleep(1600);

    // const sleeper = async () => {
    //   console.log("START: delay");
    //   await sleep(1600);
    //   console.log("END: delay");
    //   // await sleep(this.currentDelay());
    // };
    // await sleeper();
  }

  getDelay(key) {
    return this._delays[key];
  }

  setDelay(key) {
    this._delay = this._delays[key];
  }

  currentDelay() {
    return this._currentDelay;
  }

  setCurrentDelay(key) {
    this._currentDelay = this._delays[key];
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
    await this.runCollection("first");
    // this.colorSeeds.generateRandomSeeds();
    // this.loadMajorColorPrefixesFromSeedsForEveryChar();
    // this.applyUpdates();
    // await sleep(this._delays.xsmall);
    //  this.baselineUpdate();
  }

  prepRandomSeeds() {
    console.log("Prepping random seeds");
    this.colorSeeds.generateRandomSeeds();
  }

  getMajorShiftFromSeed(prefix) {
    const seed = this.colorSeeds.seeds[prefix];
    const value = randomShift(
      seed.currentValue(),
      seed.min(),
      seed.max(),
      seed.major(),
      seed.direction(),
    );
    console.log(value);
    return value;
  }

  getMinorShiftFromSeed(prefix) {
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

  loadMajorColorPrefixesFromSeedsForEveryChar() {
    const updates = [];
    this.listOfChars().forEach((char) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        const value = this.getMajorShiftFromSeed(prefix);
        updates.push([char, {
          [prefix]: value,
        }]);
      });
    });
    this.loadUpdates(updates);
  }

  loadMinorColorPrefixesFromSeedsForEveryChar() {
    const updates = [];
    this.listOfChars().forEach((char) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        const value = this.minorShiftFromSeed(prefix);
        updates.push([char, {
          [prefix]: value,
        }]);
      });
    });
    this.loadUpdates(updates);
  }

  async baselineUpdate() {
    this.loadUpdates(
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
    await sleep(this._delays.default);
    this.changePicker();
  }

  loadUpdates(payload) {
    payload.forEach(([char, details]) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        if (details[prefix] !== undefined) {
          this.letters[char].setColorPrefix(prefix, details[prefix]);
        }
      });
    });
  }

  applyUpdates() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.applyUpdates();
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

  // setMinorColorUpdatesFromSeeds() {
  //   Object.entries(this.letters).forEach(([_, letter]) => {
  //     // letter.setMinorColorUpdateFromSeeds();
  //   });
  // }

  // setEveryColorDelay(ms) {
  //   Object.entries(this.letters).forEach(([_, letter]) => {
  //     letter.setColorDelay(ms);
  //   });
  // }

  // async shiftThingsAround() {
  //   // this.updateLetterColorsWithSeed();
  //   this.updateVarsForLetters();
  //   // this.shiftThingsAround();
  // }

  // async doBasicUpdate() {
  //   this.colorSeeds.doMinorShift();
  // }

  addBaseStyles() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];
  }

  // applyAllColors() {
  //   Object.entries(this.letters).forEach(([_, letter]) => {
  //     letter.applyColor();
  //   });
  // }

  //
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
