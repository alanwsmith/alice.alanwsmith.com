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


const colorSet = [
  "Hue|_|0|360|0.1|color-h||30|120|",
  "Lightness|_|60|90|0.1|color-l|%|10|25",
  "Chroma|_|0|200|0.1|color-c|%|30|90",
];

const styleSet = [
  // (Deprecated Key) |
  // (Deprecated Default) |
  // Min |
  // Max |
  // (Deprecated Step) |
  // Prefix |
  // Unit |
  // Small Step Max |
  // Large Step Max |
  // TODO: Move the style prop prefix to the key

  "BLDA|_|0|1000|1|BLDA||150|600",
  "BLDB|_|0|1000|1|BLDB||150|600",
  "SKLA|_|0|1000|1|SKLA||150|600",
  "SKLB|_|0|1000|1|SKLB||150|600",
  "SKLD|_|0|1000|1|SKLD||150|600",
  "TRMA|_|0|1000|1|TRMA||150|600",
  "TRMB|_|0|1000|1|TRMB||150|600",
  "TRMC|_|0|1000|1|TRMC||150|600",
  "TRMD|_|0|1000|1|TRMD||150|600",
  "TRME|_|0|1000|1|TRME||150|600",
  "TRMF|_|0|1000|1|TRMF||150|600",
  "TRMG|_|0|1000|1|TRMG||150|600",
  "TRMK|_|0|1000|1|TRMK||150|600",
  "TRML|_|0|1000|1|TRML||150|600",
];

// "Size|_|2|3|0.05|font-size|rem||",
// "Rotate|0|0|0|0|rotate|deg",
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

function colorProps() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      small_jump: parseInt(parts[7]),
      large_jump: parseInt(parts[8]),
    };
  });
  return result;
}

function props() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      small_jump: parseInt(parts[7]),
      large_jump: parseInt(parts[8]),
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
export default class {
  bittyInit() {
    addBaseStyleSheet();

    // // TODO: Deprecated the mouse handling stuff
    // this.api.querySelector(".output").addEventListener("mousemove", (event) => {
    //   if (state.watchingMouse) {
    //     state.updateLetter(
    //       event.clientX -
    //         state.mouseStart.x,
    //       event.clientX -
    //         state.mouseStart.x,
    //     );
    //   }
    // });
    // this.api.querySelector(".output").addEventListener("mouseup", (event) => {
    //   state.watchingMouse = false;
    // });

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