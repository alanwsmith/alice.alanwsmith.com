class State {
  constructor() {
    this.seedRanges = {
      lightness: [70, 90],
      chroma: [0, 200],
      hue: [0, 360],
    };
    this.seeds = {
      lightness: randomInt(
        this.seedRanges.lightness[0],
        this.seedRanges.lightness[1],
      ),
      chroma: randomInt(
        this.seedRanges.chroma[0],
        this.seedRanges.chroma[1],
      ),
      hue: randomInt(
        this.seedRanges.hue[0],
        this.seedRanges.hue[1],
      ),
    };
    this.loadData();
  }

  addStyleSheet() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];

    // cover everything that's not a letter
    styles.push(
      `.output { 
            color: lch(var(--color-l-Q) var(--color-c-Q) var(--color-h-Q) ); 
            font-variation-settings: 
              'BLDA' var(--BLDA-Q), 
              'BLDB' var(--BLDB-Q), 
              'SKLA' var(--SKLA-Q), 
              'SKLB' var(--SKLB-Q), 
              'SKLD' var(--SKLD-Q), 
              'TRMA' var(--TRMA-Q), 
              'TRMB' var(--TRMB-Q), 
              'TRMC' var(--TRMC-Q), 
              'TRMD' var(--TRMD-Q), 
              'TRME' var(--TRME-Q), 
              'TRMF' var(--TRMF-Q), 
              'TRMG' var(--TRMG-Q), 
              'TRMK' var(--TRMK-Q), 
              'TRML' var(--TRML-Q);
        }`,
    );

    this.letters().forEach((letter) => {
      styles.push(
        `.letter-${letter} { 
  transition-property: color;
  transition-duration: 4s;

/*
            transform: rotate(var(--rotate-${letter}));
            font-size: var(--font-size-${letter});
*/
            font-size: 2.7rem;
            padding-inline: 0.11rem;
            color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) ); 
            font-variation-settings: 
              'BLDA' var(--BLDA-${letter}), 
              'BLDB' var(--BLDB-${letter}), 
              'SKLA' var(--SKLA-${letter}), 
              'SKLB' var(--SKLB-${letter}), 
              'SKLD' var(--SKLD-${letter}), 
              'TRMA' var(--TRMA-${letter}), 
              'TRMB' var(--TRMB-${letter}), 
              'TRMC' var(--TRMC-${letter}), 
              'TRMD' var(--TRMD-${letter}), 
              'TRME' var(--TRME-${letter}), 
              'TRMF' var(--TRMF-${letter}), 
              'TRMG' var(--TRMG-${letter}), 
              'TRMK' var(--TRMK-${letter}), 
              'TRML' var(--TRML-${letter});
        }`,
      );
    });

    stylesSheet.replaceSync(styles.join("\n"));
    document.adoptedStyleSheets.push(stylesSheet);
    const varsSheet = new CSSStyleSheet();
    let styleVars = [];
    styleVars.push(":root {");
    for (let key in this.sliderHash()) {
      const v = this.sliderHash()[key].key;
      this.letters().forEach((letter) => {
        const flag = `--${v}-${letter}`;
        const value = `${this.data.letters[letter].values[key].value}${
          this.sliderHash()[key].unit
        }`;
        styleVars.push(`${flag}: ${value};`);
      });
    }
    styleVars.push("}");
    varsSheet.replaceSync(styleVars.join("\n"));
    document.adoptedStyleSheets.push(varsSheet);
  }

  getCurrentLetter() {
    return this.data.currentLetter;
  }

  getSliderValue(name) {
    return this.data.letters[this.getCurrentLetter()].values[name].value;
  }

  letters() {
    return Object.keys(this.data.letters);
  }

  loadData() {
    this.data = {
      letters: {},
      currentLetter: "A",
    };
    for (let num = 65; num <= 90; num += 1) {
      const letter = String.fromCharCode(num);
      this.data.letters[letter] = {
        values: {},
      };
      this.randomizeLetter(letter);
    }
  }

  randomizeLetter(letter) {
    this.sliders().forEach((slider) => {
      if (slider.name === "Lightness") {
        this.data.letters[letter].values[slider.name] = {
          value: randomInt(
            this.seeds.lightness - 12,
            this.seeds.lightness + 12,
          ),
        };
      } else if (slider.name === "Rotate") {
        // if ((Math.random() * 10) > 8) {
        this.data.letters[letter].values[slider.name] = {
          value: randomInt(
            -4,
            5,
          ),
        };
        // } else {
        //   this.data.letters[letter].values[slider.name] = {
        //     value: 0,
        //   };
        //}
      } else if (slider.name === "Chroma") {
        this.data.letters[letter].values[slider.name] = {
          value: randomInt(
            this.seeds.chroma - 20,
            this.seeds.chroma + 30,
          ),
        };
      } else if (slider.name === "Hue") {
        this.data.letters[letter].values[slider.name] = {
          value: randomInt(
            this.seeds.hue - 30,
            this.seeds.hue + 60,
          ),
        };
      } else if (slider.name === "Size") {
        this.data.letters[letter].values[slider.name] = {
          value: Math.random() + 2,
        };
      } else if (slider.name !== "Padding" && slider.name !== "Size") {
        this.data.letters[letter].values[slider.name] = {
          value: randomInt(slider.min, 560),
        };
      } else {
        this.data.letters[letter].values[slider.name] = {
          value: slider.default,
        };
      }
    });
  }

  setCurrentLetter(letter) {
    this.data.currentLetter = letter;
  }

  setSliderValue(name, value) {
    this.data.letters[this.getCurrentLetter()].values[name].value = value;
    const varName = `--${
      this.sliderHash()[name].key
    }-${this.getCurrentLetter()}`;
    const varValue = `${value}${this.sliderHash()[name].unit}`;
    //console.log(varName);
    document.documentElement.style.setProperty(varName, varValue);
  }

  sliderHash() {
    const result = {};
    styleSet.forEach((slider) => {
      const parts = slider.split("|");
      result[parts[0]] = {
        default: parts[1],
        min: parts[2],
        max: parts[3],
        step: parts[4],
        key: parts[5],
        unit: parts[6],
      };
    });
    return result;
  }

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

  sliderData(name, key) {
    return this.sliderHash()[name][key];
  }

  updateLetter(x, y) {
    const newHue = state.startValue.Hue + (x * 2);
    this.setSliderValue("Hue", newHue);
  }

  updateSeeds() {
    this.seeds = {
      lightness: randomInt(70, 90),
      chroma: randomInt(10, 18),
      hue: randomInt(30, 310),
    };
  }

  //
}

const state = new State();
