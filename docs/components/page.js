const axes = [
  "BLDA",
  "BLDB",
  "WMX2",
  "SKLA",
  "SKLB",
  "SKLD",
  "TRMA",
  "TRMB",
  "TRMC",
  "TRMD",
  "TRME",
  "TRMF",
  "TRMG",
  "TRMK",
  "TRML",
];

const SpanMaker = class {
  constructor(text) {
    this.text = text;
    this.textParagraphs = [];
    this.spanParagraphs = [];
  }

  paras() {
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

  makeSpans() {
    this.spanParagraphs = this.textParagraphs.map((para) => {
      return para.split("").map((char, charIndex) => {
        if (isLetter(char)) {
          const letterClass = `letter-${char.toUpperCase()}`;
          if (charIndex === 0) {
            return `<span class="${letterClass}">${char}</span>`;
          } else {
            return `<span class="${letterClass}">${char}</span>`;
          }
        } else {
          return char;
        }
      }).join("");
    });
    return this;
  }

  output() {
    return `<p>${this.spanParagraphs.join("</p><p>")}</p>`;
  }
};

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

class State {
  constructor() {
    this._sliders = [
      "L|40|0|100|0.1|color-l|%",
      "C|90|0|180|0.1|color-c|",
      "H|140|0|360|0.1|color-h|",
      "A|1|0|1|0.01|color-a|",
      "Size|1.1|0.8|2.2|0.05|font-size|rem",
      "Weight|400|100|900|50|font-weight|",
    ];
    this.loadData();
  }

  addStyleSheet() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];
    this.letters().forEach((letter) => {
      styles.push(
        `.letter-${letter} { color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) / var(--color-a-${letter})) ; }`,
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
      this.sliders().forEach((slider) => {
        this.data.letters[letter].values[slider.name] = {
          value: slider.default,
        };
      });
    }
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
    console.log(varName);
    document.documentElement.style.setProperty(varName, varValue);
  }

  sliderHash() {
    const result = {};
    this._sliders.forEach((slider) => {
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
    return this._sliders.map((slider) => {
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

  getSliderValue(name) {
    return this.data.letters[this.getCurrentLetter()].values[name].value;
  }
}

const state = new State();

export default class {
  bittyInit() {
    state.addStyleSheet();
  }

  changeValue(event, el) {
    const ds = event.target.dataset;
    if (el.dataset.name === ds.name) {
      let value = event.target.value;
      state.setSliderValue(ds.name, value);
      el.innerHTML = value;
    }
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
      <label>${slider.name}
      <input
        type="range"
        min="${state.sliderData(slider.name, "min")}"
        max="${state.sliderData(slider.name, "max")}"
        step="${state.sliderData(slider.name, "step")}"
        value="${value}"
        data-send="changeValue"
        data-name="${slider.name}"
      />
      </label>
      <span data-name="${slider.name}" data-receive="changeValue">${value}</span>
      `;
      el.appendChild(newDiv);
    });
  }

  input(_event, el) {
    const ta = this.api.querySelector("textarea");
    let spans = new SpanMaker(ta.value).paras().makeSpans();
    el.innerHTML = spans.output();
  }

  setLetter(event, _el) {
    if (event) {
      state.setCurrentLetter(
        event.target.dataset.letter,
      );
    }
  }
}
