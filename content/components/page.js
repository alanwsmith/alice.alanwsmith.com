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

const styleSet = [
  // Key | Seed | Min | Max | Step | Prefix | Unit
  "Hue|140|0|360|0.1|color-h|",
  "Lightness|60|0|90|0.1|color-l|%",
  "Chroma|80|0|200|0.1|color-c|%",
  "Size|2.2|2.0|3.0|0.05|font-size|rem",
  "BLDA|200|0|1000|1|BLDA|",
  "BLDB|200|0|1000|1|BLDB|",
  "SKLA|200|0|1000|1|SKLA|",
  "SKLB|200|0|1000|1|SKLB|",
  "SKLD|200|0|1000|1|SKLD|",
  "TRMA|200|0|1000|1|TRMA|",
  "TRMB|200|0|1000|1|TRMB|",
  "TRMC|200|0|1000|1|TRMC|",
  "TRMD|200|0|1000|1|TRMD|",
  "TRME|200|0|1000|1|TRME|",
  "TRMF|200|0|1000|1|TRMF|",
  "TRMG|200|0|1000|1|TRMG|",
  "TRMK|200|0|1000|1|TRMK|",
  "TRML|200|0|1000|1|TRML|",
  "Rotate|0|0|0|0|rotate|deg",
];

 [! include "components/_includes/span-maker.js" !]


function isLetter(char) {
  let code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function letters() {
  let output = [];
  for (let num = 65; num <= 90; num += 1) {
    output.push(String.fromCharCode(num));
  }
  return output;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shiftNumber(position, min, max, move) {
  let step = (move > 0) ? 1 : -1;
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += step;
    if (position === max) {
      step = -1;
    } else if (position === min) {
      step = 1;
    }
  }
  return position;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class State {
  constructor() {
    this.seeds = {
      lightness: randomNumberBetween(50, 70),
      chroma: randomNumberBetween(30, 190),
      hue: randomNumberBetween(30, 310),
    };
    this.loadData();
  }

  addStyleSheet() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];

    // cover everything that's not a letter
    styles.push(
      `.output { 
            color: lch(var(--color-l-Q) 140 var(--color-h-Q) ); 
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
            color: lch(var(--color-l-${letter}) 130 var(--color-h-${letter}) ); 
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
          value: randomNumberBetween(
            this.seeds.lightness - 12,
            this.seeds.lightness + 12,
          ),
        };
      } else if (slider.name === "Rotate") {
        // if ((Math.random() * 10) > 8) {
        this.data.letters[letter].values[slider.name] = {
          value: randomNumberBetween(
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
          value: randomNumberBetween(
            this.seeds.chroma - 20,
            this.seeds.chroma + 30,
          ),
        };
      } else if (slider.name === "Hue") {
        this.data.letters[letter].values[slider.name] = {
          value: randomNumberBetween(
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
          value: randomNumberBetween(slider.min, 560),
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
}

const state = new State();

export default class {
  bittyInit() {
    state.addStyleSheet();
    this.api.querySelector(".output").addEventListener("mousemove", (event) => {
      if (state.watchingMouse) {
        state.updateLetter(
          event.clientX -
            state.mouseStart.x,
          event.clientX -
            state.mouseStart.x,
        );
      }
    });
    this.api.querySelector(".output").addEventListener("mouseup", (event) => {
      state.watchingMouse = false;
    });
    this.triggerChange();
  }

  triggerChange() {
    setTimeout(() => {
      this.api.forward(null, "doChange");
      this.doChange();
    }, 2000);
  }

  changeValue(event, el) {
    const ds = event.target.dataset;
    let value = event.target.value;
    state.setSliderValue(ds.name, value);
  }

  loadLetters(_event, el) {
    letters().forEach((letter) => {
      let btn = document.createElement("button");
      btn.innerHTML = letter;
      btn.dataset.send = "setLetter|loadControls";
      btn.dataset.letter = letter;
      el.appendChild(btn);
    });
  }

  loadControls(_event, el) {
    el.replaceChildren();
    state.sliders().forEach((slider) => {
      const newDiv = document.createElement("div");
      const value = state.getSliderValue(slider.name);
      newDiv.innerHTML = `
      <label>${slider.name}<br />
      <input
        type="range"
        min="${state.sliderData(slider.name, "min")}"
        max="${state.sliderData(slider.name, "max")}"
        step="${state.sliderData(slider.name, "step")}"
        value="${value}"
        data-send="changeValue"
        data-name="${slider.name}"
      />
      </label>`;
      el.appendChild(newDiv);
    });
  }

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

  setLetter(event, _el) {
    if (event) {
      state.setCurrentLetter(
        event.target.dataset.letter,
      );
      state.startValue = {
        "Hue": state.data.letters[state.getCurrentLetter()].values["Hue"].value,
      };
      state.mouseStart = {
        x: event.clientX,
        y: event.clientY,
      };
      state.watchingMouse = true;
    }
  }

  doChange(_event, _el) {
    document.documentElement.style.setProperty(
      "--color-h-A",
      randomNumberBetween(0, 360),
    );
  }
}
