class State {
  constructor() {
    this.seeds = {};
    this.changeCount = 0;
    this.updateSeeds();
    this.loadData();
    this.addStyleSheetVars();
  }

  addStyleSheetVars() {
    const varsSheet = new CSSStyleSheet();
    let styleVars = [];
    styleVars.push(":root {");
    this.generateStyleVars().forEach((sv) => {
      styleVars.push(`${sv[0]}: ${sv[1]};`);
    });
    styleVars.push("}");
    varsSheet.replaceSync(styleVars.join("\n"));
    document.adoptedStyleSheets.push(varsSheet);
  }

  generateStyleVars() {
    const result = [];
    letters().forEach((letter) => {
      Object.keys(props()).forEach((prop) => {
        const flag = `--${prop}-${letter}`;
        const value = this.data.letters[letter].values[prop].value;
        const unit = props()[prop].unit;
        result.push([
          flag,
          `${value}${unit}`,
        ]);
      });
    });
    return result;
  }

  getCurrentLetter() {
    return this.data.currentLetter;
  }

  // TODO: Deprecate this
  getSliderValue(name) {
    return this.data.letters[this.getCurrentLetter()].values[name].value;
  }

  // letters() {
  //   return Object.keys(this.data.letters);
  // }

  loadData() {
    this.data = {
      letters: {},
      currentLetter: "A",
    };
    // TODO: Switch to letters() function
    for (let num = 65; num <= 90; num += 1) {
      const letter = String.fromCharCode(num);
      this.data.letters[letter] = {
        values: {},
      };
      this.randomizeLetterSmallJump(letter);
    }
  }

  randomizeLetterSmallJump(letter) {
    Object.keys(props()).forEach((prop) => {
      let randomShift = randomFloat(
        0,
        props()[prop].large_jump,
      );
      if (randomInt(0, 1) === 1) {
        randomShift *= -1;
      }
      const value = shiftNumber(
        this.seeds[prop],
        props()[prop].min,
        props()[prop].max,
        randomShift,
      );
      this.data.letters[letter].values[prop] = {
        value: value,
      };
    });
  }

  //this.sliders().forEach((slider) => {
  //  if (slider.name === "Lightness") {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: randomInt(
  //        this.seeds.lightness - 12,
  //        this.seeds.lightness + 12,
  //      ),
  //    };
  //  } else if (slider.name === "Rotate") {
  //    // if ((Math.random() * 10) > 8) {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: randomInt(
  //        -4,
  //        5,
  //      ),
  //    };
  //    // } else {
  //    //   this.data.letters[letter].values[slider.name] = {
  //    //     value: 0,
  //    //   };
  //    //}
  //  } else if (slider.name === "Chroma") {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: randomInt(
  //        this.seeds.chroma - 20,
  //        this.seeds.chroma + 30,
  //      ),
  //    };
  //  } else if (slider.name === "Hue") {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: randomInt(
  //        this.seeds.hue - 30,
  //        this.seeds.hue + 60,
  //      ),
  //    };
  //  } else if (slider.name === "Size") {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: Math.random() + 2,
  //    };
  //  } else if (slider.name !== "Padding" && slider.name !== "Size") {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: randomInt(slider.min, 560),
  //    };
  //  } else {
  //    this.data.letters[letter].values[slider.name] = {
  //      value: slider.default,
  //    };
  //  }
  //});

  setCurrentLetter(letter) {
    this.data.currentLetter = letter;
  }

  //setSliderValue(name, value) {
  //  this.data.letters[this.getCurrentLetter()].values[name].value = value;
  //  const varName = `--${
  //    this.sliderHash()[name].key
  //  }-${this.getCurrentLetter()}`;
  //  const varValue = `${value}${this.sliderHash()[name].unit}`;
  //  //console.log(varName);
  //  document.documentElement.style.setProperty(varName, varValue);
  //}

  // TODO: Deprecate this
  sliders() {
    return styleSet.map((slider) => {
      const parts = slider.split("|");
      return {
        name: parts[0],
        default: parts[1],
        min: parts[2],
        max: parts[3],
        step: parts[4],
        key: parts[5],
        unit: parts[6],
      };
    });
  }

  // TODO: Deprecate this
  sliderData(name, key) {
    return this.sliderHash()[name][key];
  }

  // TODO: Deprecate this
  updateLetter(x, y) {
    const newHue = state.startValue.Hue + (x * 2);
    this.setSliderValue("Hue", newHue);
  }

  updateSeeds() {
    // TODO: use initial values to make
    // changes from for small and large
    // bumps instead of just completely
    // random again.
    Object.keys(props()).forEach((prop) => {
      this.seeds[prop] = randomFloat(props()[prop].min, props()[prop].max);
    });
    // console.log(this.seeds);

    // this.seeds = {
    //   lightness: randomInt(
    //     this.seedRanges.lightness[0],
    //     this.seedRanges.lightness[1],
    //   ),
    //   chroma: randomInt(
    //     this.seedRanges.chroma[0],
    //     this.seedRanges.chroma[1],
    //   ),
    //   hue: randomInt(
    //     this.seedRanges.hue[0],
    //     this.seedRanges.hue[1],
    //   ),
    // };

    // this.seeds = {
    //   lightness: randomInt(70, 90),
    //   chroma: randomInt(10, 18),
    //   hue: randomInt(30, 310),
    // };
  }

  updateStyleVars() {
    document.documentElement.style.setProperty("-color-h-A", 200);
  }

  //
}

const state = new State();
