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
  // (Deprecated Key) | (Deprecated Default) | Min | Max | Step | Prefix | Unit
  // TODO: Move the style prop prefix to the key
  "Hue|140|0|360|0.1|color-h|",
  "Lightness|60|0|90|0.1|color-l|%",
  "Chroma|80|0|200|0.1|color-c|%",
  "Size|2.2|2|3|0.05|font-size|rem",
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
  // cover everything that's not a letter
  styles.push(
    `.output { 
          transition-property: color;
          transition-duration: 4s;
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
  letters().forEach((letter) => {
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
}

function props() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      step: parseInt(parts[4]),
      unit: parts[6],
    };
  });
  return result;
}

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

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
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
    this.seeds = {};
    // this.seedRanges = {
    //   lightness: [70, 90],
    //   chroma: [0, 200],
    //   hue: [0, 360],
    // };

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

    this.updateSeeds();
    this.loadData();
    this.addStyleSheetVars();
  }

  addStyleSheetVars() {
    const varsSheet = new CSSStyleSheet();
    let styleVars = [];
    styleVars.push(":root {");
    Object.keys(props()).forEach((prop) => {
      letters().forEach((letter) => {
        const flag = `--${prop}-${letter}`;
        // console.log(flag);
        // const value = `${this.data.letters[letter].values[prop].value}${
        //   props()[prop].unit
        // }`;
        //styleVars.push(`${flag}: ${value};`);

        //console.log(`${prop}-${letter}`);
      });
    });
    // for (let key in this.sliderHash()) {
    //   const v = this.sliderHash()[key].key;
    //   this.letters().forEach((letter) => {
    //     const flag = `--${v}-${letter}`;
    //     const value = `${this.data.letters[letter].values[key].value}${
    //       this.sliderHash()[key].unit
    //     }`;
    //     styleVars.push(`${flag}: ${value};`);
    //   });
    // }
    styleVars.push("}");
    varsSheet.replaceSync(styleVars.join("\n"));
    document.adoptedStyleSheets.push(varsSheet);
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
      this.randomizeLetter(letter);
    }
  }

  randomizeLetter(letter) {
    Object.keys(props()).forEach((prop) => {
      this.data.letters[letter].values[prop] = {
        value: 0,
      };
    });
    //console.log(letter);
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
    Object.keys(props()).forEach((prop) => {
      this.seeds[prop] = randomFloat(props()[prop].min, props()[prop].max);
    });
    console.log(this.seeds);

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
export default class {
  bittyInit() {
    addBaseStyleSheet();
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
      this.triggerChange();
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
    state.updateStyleVars();
    // document.documentElement.style.setProperty(
    //   "--color-h-A",
    //   randomInt(0, 360),
    // );
  }
}