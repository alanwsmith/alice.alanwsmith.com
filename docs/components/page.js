// Hey there!
//
// Welcome to the code! This project involved a lot
// of prototyping. There's a bunch of
// cruft left over from that. Other than that
// the big thing to know is that this I'm
// using bitty for this `https://bitty.alanwsmith.com`.
// It's the first real thing I've built with it.
// Helped me refine a bunch. I really like
// the way it's working.

class ColorPrefix {
  constructor(unit) {
    this._unit = unit;
    this._currentValue = null;
    this._previousValue = null;
  }

  currentValueString() {
    return `${this.currentValue()}${this.unit()}`;
  }

  currentValue() {
    return this._currentValue;
  }

  setCurrentValue(value) {
    this.setPreviousValue = this.currentValue();
    this._currentValue = value;
  }

  setPreviousValue(value) {
    this._previousValue = value;
  }

  unit() {
    return this._unit;
  }
}
class ColorSeed {
  constructor(min, max, minor, major) {
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this._currentValue = null;
    this._previousValue = null;
    this.setDirection(
      randomInt(0, 1) === 1 ? 1 : -1,
    );
  }

  doMajorShift() {
    this.previousValue = this.currentValue;
    this.currentValue = randomShift(
      this.value(),
      this.min,
      this.max,
      this.major,
      this.direction,
    );
    if (this.previousValue() > this.currentValue()) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  doMinorShift() {
    this.previousValue = this.currentValue;
    this.currentValue = randomShift(
      this.value(),
      this.min,
      this.max,
      this.minor,
      this.direction(),
    );
    if (this.previousValue > this.currentValue) {
      this.setDirection(-1);
    } else {
      this.setDirection(1);
    }
  }

  generateRandomSeed() {
    this.previousValue = this.currentValue;
    this.currentValue = randomInt(
      this.min,
      this.max,
    );
  }

  setDirection(value) {
    this._direction = value;
  }

  setCurrentValue(value) {
    this.setPreviousValue(this.currentValue());
    this._currentValue = value;
  }

  setPreviousValue(value) {
    this._previousValue = value;
  }

  setValue(value) {
    this.previousValue = this.currentValue;
    this.currentValue = value;
  }

  value() {
    return this.currentValue;
  }
}
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
// Key/Prefix |
// (Deprecated Default) |
// Min |
// Max |
// (Deprecated Step) |
// (Deprecated Prefix) |
// Unit |
// Small Step Max |
// Large Step Max |
// TODO: Move the style prop prefix to the key

const colorSet = [
  "color-l|_|50|70|_|color-l|%|10|30",
  "color-c|_|10|40|_|color-c||10|60",
  "color-h|_|0|360|_|color-h||60|200|",
];

const propSet = [
  "BLDA|_|0|1000|_|BLDA||150|500",
  "BLDB|_|0|1000|_|BLDB||150|500",
  "SKLA|_|0|1000|_|SKLA||150|500",
  "SKLB|_|0|1000|_|SKLB||150|500",
  "SKLD|_|0|1000|_|SKLD||150|500",
  "TRMA|_|0|1000|_|TRMA||150|500",
  "TRMB|_|0|1000|_|TRMB||150|500",
  "TRMC|_|0|1000|_|TRMC||150|500",
  "TRMD|_|0|1000|_|TRMD||150|500",
  "TRME|_|0|1000|_|TRME||150|500",
  "TRMF|_|0|1000|_|TRMF||150|500",
  "TRMG|_|0|1000|_|TRMG||150|500",
  "TRMK|_|0|1000|_|TRMK||150|500",
  "TRML|_|0|1000|_|TRML||150|500",
];

// TODO: Deprecate styleSet;
const styleSet = propSet;

// "Size|_|2|3|0.05|font-size|rem||",
// "Rotate|0|0|0|0|rotate|deg",
class Letter {
  constructor(letter) {
    this.char = letter;
    this.initColorPrefixes();
    this.previousUpdates = {};
  }

  initColorPrefixes() {
    this.colorPrefixes = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.colorPrefixes[parts[0]] = new ColorPrefix(
        parts[6],
      );
    });
  }

  setColorPrefix(prefix, value) {
    this.colorPrefixes[prefix].setCurrentValue(value);
  }

  setColorDelay(ms) {
    const key = `--color-transition-${this.char}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  applyColorPrefixes() {
    Object.entries(this.colorPrefixes).forEach(([prefix, details]) => {
      const key = `--${prefix}-${this.char}`;
      if (this.previousUpdates[key] !== details.currentValueString()) {
        const value = details.currentValueString();
        document.documentElement.style.setProperty(key, value);
        this.previousUpdates[key] = value;
      }
    });
  }
}
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

  setMinorColorPrefixesFromSeedsForEveryChar() {
    const updates = [];
    this.listOfChars().forEach((char) => {
      this.listOfColorPrefixes().forEach((prefix) => {
        console.log(this.colorSeeds.seeds[prefix]);
        updates.push([char, { [prefix]: randomInt(30, 80) }]);
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
class Prop {
  constructor(prefix, min, max, minor, major) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}

class PropSeeds {
  constructor() {
    propSet.forEach((line) => {
      const parts = line.split("|");
      this[parts[0]] = new PropSeed(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
  }
}

class PropSeed {
  constructor(key, min, max, minor, major) {
    this.prefix = key;
    this.min = min;
    this.max = max;
    this.minor = minor;
    this.major = major;
    this.moves = [];
  }
}

const SpanMaker = class {
  constructor(text) {
    this.text = text;
    this.textParagraphs = [];
    this.wordParagraphs = [];
    this.spanParagraphs = [];
  }

  makeParagraphs() {
    let parasIndex = 0;
    this.text.split("\n").forEach((line) => {
      if (!this.textParagraphs[parasIndex]) {
        this.textParagraphs.push("");
      }
      this.textParagraphs[parasIndex] += `${line} `;
      if (line === "") {
        parasIndex += 1;
      }
    });
    return this;
  }

  makeWords() {
    // The word split was originally done so spans
    // could be switch to `display: inline-block` to
    // allow them to be rotated. Decided against
    // the rotation after playing with a little,
    // but leaving the word split in anyway.
    this.wordParagraphs = this.textParagraphs.map((para) => {
      return para
        .replaceAll(`"`, "")
        .replaceAll(`?`, "")
        .replaceAll(`-`, " ")
        .replaceAll(`)`, "")
        .replaceAll(`(`, "")
        .replaceAll(/\s\s+/g, " ").split(" ");
    });
    return this;
  }

  makeSpans() {
    this.spanParagraphs = this.wordParagraphs.map((para) => {
      return para.map((word) => {
        return [
          `<div class="word">`,
          word.trim().split("").map((char) => {
            if (isLetter(char)) {
              return [
                `<span class="letter letter-`,
                char.toUpperCase(),
                `">`,
                char,
                `</span>`,
              ].join("");
            } else {
              return [
                `<span class="letter letter-Q letter-alt`,
                `">`,
                char,
                `</span>`,
              ].join("");
            }
          }).join(""),
          `</div>`,
        ].join("");
      }).join(``);
    });
    return this;
  }

  output() {
    return `<p>${this.spanParagraphs.join("</p><p>")}</p>`;
  }
};
function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];
  styles.push(`:root{
--default-font-size: 1.0rem;
--letter-font-size: 2.7rem;
--color-h-A: 200;
}`);
  styles.push(`.output { 
    font-size: var(--default-font-size);
    color: lch(var(--color-l-Q) var(--color-c-Q) var(--color-h-Q) ); 
    transition-property: color;
    transition-duration: var(--color-transition-Q);
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
      'TRML' var(--TRML-Q);}`);
  chars().forEach((letter) => {
    styles.push(`.letter-${letter} { 
      font-size: var(--letter-font-size);
      color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) ); 
      transition-property: color;
      transition-duration: var(--color-transition-${letter});
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
        'TRML' var(--TRML-${letter});}`);
  });
  stylesSheet.replaceSync(styles.join("\n"));
  document.adoptedStyleSheets.push(stylesSheet);
}

// TODO: Deprecate this
function colorProps() {
  const result = {};
  colorSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: "",
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      little_step: parseInt(parts[7]),
      big_step: parseInt(parts[8]),
    };
  });
  return result;
}

// TODO: Deprecate this
function props() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      // TODO: Rename to _step to match
      // color
      little_step: parseInt(parts[7]),
      big_step: parseInt(parts[8]),
    };
  });
  return result;
}

function isLetter(char) {
  let code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function chars() {
  let output = [];
  for (let num = 65; num <= 90; num += 1) {
    output.push(String.fromCharCode(num));
  }
  return output;
}

// TODO: Deprecate this
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomShift(position, min, max, base, direction) {
  // console.log(`${position} ${min} ${max} ${base} ${direction}`);
  // console.log(position);
  const move = randomInt(0, base);
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += direction;
    if (position >= max) {
      direction = -1;
    } else if (position <= min) {
      direction = 1;
    }
  }
  // console.log(position);
  return position;
}

function shiftNumber(position, min, max, move) {
  let step = (move > 0) ? 1 : -1;
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += step;
    if (position >= max) {
      step = -1;
    } else if (position <= min) {
      step = 1;
    }
  }
  return position;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const State = class {
  constructor() {
    this.letters = new Letters();
    //this.letters = {};

    // TODO: Deprecate this
    this.colorValues = {};

    // TODO: Deprecate this and
    // move everything up top.
    this.data = {
      letters: {},
      values: {},
      // Should be able to
      // remove all the currentLetter
      // stuff completely
      currentLetter: "A",
    };
    this.seeds = {};
    this.changeCount = 0;

    // this.initSeeds();
    // this.initLetters();

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

    // letters().forEach((letter) => {
    //   Object.keys(props()).forEach((prop) => {
    //     const flag = `--${prop}-${letter}`;
    //     const value = this.letters[letter][prop];
    //     const unit = props()[prop].unit;
    //     result.push([
    //       flag,
    //       `${value}${unit}`,
    //     ]);
    //   });
    // });

    Object.entries(this.colorValues).forEach(([letter, props]) => {
      Object.entries(props).forEach(([prop, value]) => {
        const flag = `--${prop}-${letter}`;
        const unit = prop === "color-l" ? "%" : "";
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

  // initLetters() {
  //   this.letters = {};
  // }

  randomizeLetterSmallJump(letter) {
    Object.keys(props()).forEach((prop) => {
      let randomShift = randomFloat(
        0,
        props()[prop].little_step,
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

  // TODO: Deprecate this
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

  // initDirections() {
  //   this.directions = {};
  //   Object.keys(props()).forEach((prop) => {
  //     this.directions[prop] = randomInt(0, 1) === 1 ? 1 : -1;
  //   });
  //   Object.keys(colorProps()).forEach(([prop, values]) => {
  //     this.directions[prop] = randomInt(0, 1) === 1 ? 1 : -1;
  //   });
  // }

  // initSeeds() {
  //   this.colorSeeds = new ColorSeeds();
  //   this.propSeeds = new PropSeeds();
  //   // Object.keys(props()).forEach((prop) => {
  //   //   this.seeds[prop] = randomFloat(props()[prop].min, props()[prop].max);
  //   // });
  //   // Object.entries(colorProps()).forEach(([prop, values]) => {
  //   //   this.colorSeeds[prop] = randomFloat(values.min, values.max);
  //   // });
  // }

  updateLetters() {
    // const direction = randomInt(0, 1) === 1 ? 1 : -1;
    // letters().forEach((letter) => {
    //   Object.entries(props()).forEach(([prop, values]) => {
    //     this.letters[letter][prop] = randomInt(0, 500);
    //   });
    //   Object.entries(colorProps()).forEach(([prop, values]) => {
    //     const move = randomFloat(0, values.little_step) * direction;
    //     const num = shiftNumber(
    //       this.colorSeeds[prop],
    //       values.min,
    //       values.max,
    //       move,
    //     );
    //     this.colorValues[letter][prop] = num;
    //   });
    // });
  }

  updateSeeds() {
    Object.entries(props()).forEach(([prop, values]) => {
      this.seeds[prop] = shiftNumber(
        this.seeds[prop],
        values.min,
        values.max,
        randomFloat(0, 20),
      );
    });
    Object.entries(colorProps()).forEach(([prop, values]) => {
      const num = shiftNumber(
        this.colorSeeds[prop],
        values.min,
        values.max,
        values.little_step,
      );
      this.colorSeeds[prop] = num;
    });
  }

  updateStyleVars() {
    this.generateStyleVars().forEach((sv) => {
      document.documentElement.style.setProperty(sv[0], sv[1]);
    });
  }

  //
};

// const state = new State();
export default class {
  bittyInit() {
    addBaseStyleSheet();
    const letters = new Letters();
    letters.start();

    // state.updateSeeds();
    // state.updateLetters();
    // state.updateStyleVars();

    // this.triggerChange();
  }

  triggerChange() {
    setTimeout(() => {
      this.api.forward(null, "doChange");
      this.triggerChange();
    }, 4000);
  }

  // TODO: Deprecate
  //changeValue(event, el) {
  //  const ds = event.target.dataset;
  //  let value = event.target.value;
  //  //state.setSliderValue(ds.name, value);
  //}

  loadLetters(_event, el) {
    letters().forEach((letter) => {
      let btn = document.createElement("button");
      btn.innerHTML = letter;
      btn.dataset.send = "setLetter|loadControls";
      btn.dataset.letter = letter;
      el.appendChild(btn);
    });
  }

  // TODO: Deprecate
  // loadControls(_event, el) {
  //   el.replaceChildren();
  //   state.sliders().forEach((slider) => {
  //     const newDiv = document.createElement("div");
  //     const value = state.getSliderValue(slider.name);
  //     newDiv.innerHTML = `
  //     <label>${slider.name}<br />
  //     <input
  //       type="range"
  //       min="${state.sliderData(slider.name, "min")}"
  //       max="${state.sliderData(slider.name, "max")}"
  //       step="${state.sliderData(slider.name, "step")}"
  //       value="${value}"
  //       data-send="changeValue"
  //       data-name="${slider.name}"
  //     />
  //     </label>`;
  //     el.appendChild(newDiv);
  //   });
  // }

  input(_event, el) {
    const ta = this.api.querySelector("textarea");
    let spans = new SpanMaker(ta.value).makeParagraphs().makeWords()
      .makeSpans();
    el.innerHTML = spans.output();
  }

  makeSpans(_event, el) {
    if (el) {
      let spans = new SpanMaker(el.innerText).makeParagraphs().makeWords()
        .makeSpans();
      el.innerHTML = spans.output();
    }
  }

  // TODO: Deprecate
  // setLetter(event, _el) {
  //   if (event) {
  //     state.setCurrentLetter(
  //       event.target.dataset.letter,
  //     );
  //     state.startValue = {
  //       "Hue": state.data.letters[state.getCurrentLetter()].values["Hue"].value,
  //     };
  //   }
  // }

  doChange(_event, _el) {
    // state.updateSeeds();
    // state.updateLetters();
    // state.updateStyleVars();

    // document.documentElement.style.setProperty(
    //   "--color-h-A",
    //   randomInt(0, 360),
    // );
  }
}