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

const sliders = [
  ["Size", "1.1", "0.8", "2.2", "0.05", "font-size", "rem"],
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
    // this._letters = {};
    // for (let num = 65; num <= 90; num += 1) {
    //   const letter = String.fromCharCode(num);
    //   this._letters[letter] = {};
    // }
    // this._currentLetter = "A";

    this._sliders = [
      "Size|1.1|0.8|2.2|0.05|font-size|rem",
      "Weight|400|100|900|50|font-weight|",
    ];
    this.loadData();
  }

  currentLetter() {
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
    this.data.letters[this.data.currentLetter].values[name].value = value;
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
        var: parts[5],
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
        var: parts[5],
        unit: parts[6],
      };
    });
  }

  sliderData(name, key) {
    return this.sliderHash()[name][key];
  }

  sliderValue(name) {
    return this.data.letters[this.currentLetter()].values[name].value;
  }
}

const state = new State();

export default class {
  #state = {
    letters: {},
  };

  bittyInit() {
    this.#state.letter = "A";
    this.initStateLetters();
    console.log(state);
    console.log(state.letters());
  }

  changeValue(event, el) {
    const ds = event.target.dataset;
    if (el.dataset.name === ds.name) {
      let value = parseFloat(event.target.value);
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
    console.log("loadControls");
    el.replaceChildren();
    state.sliders().forEach((slider) => {
      const newDiv = document.createElement("div");
      const value = state.sliderValue(slider.name);
      newDiv.innerHTML = `
      <label>${slider.name}
      <input
        type="range"
        min="${state.sliderData(slider.name, "min")}"
        max="${state.sliderData(slider.name, "max")}"
        step="${state.sliderData(slider.name, "step")}"
        value="${state.sliderValue(slider.name)}"
        data-send="changeValue"
        data-name="${slider.name}"
      />
      </label>
      <span data-name="${slider.name}" data-receive="changeValue">${value}</span>
      `;
      el.appendChild(newDiv);
    });
  }

  initStateLetters() {
    this.#state.letters = {};
    letters().forEach((letter) => {
      this.#state.letters[letter] = {
        values: {},
      };
      sliders.forEach((slider) => {
        this.#state.letters[letter].values[slider[0]] = {
          value: parseFloat(slider[1]),
        };
      });
    });
  }

  input(_event, el) {
    const ta = this.api.querySelector("textarea");
    if (this.#state.text !== ta.value) {
      this.#state.text = ta.value;
      let spans = new SpanMaker(ta.value).paras().makeSpans();
      el.innerHTML = spans.output();
    }
  }

  setLetter(event, el) {
    if (event) {
      this.#state.letter = event.target.dataset.letter;
    }
    el.innerHTML = this.#state.letter;
  }
}
