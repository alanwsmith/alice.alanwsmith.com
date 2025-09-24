const letterNums = [65, 90];

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

export default class {
  #currentLetter = "A";
  #currentText = "";

  letters(_event, el) {
    for (let num = letterNums[0]; num <= letterNums[1]; num += 1) {
      let btn = document.createElement("button");
      btn.innerHTML = String.fromCharCode(num);
      btn.dataset.send = "setLetter";
      btn.dataset.letter = String.fromCharCode(num);
      el.appendChild(btn);
    }
  }

  input(_event, el) {
    const ta = this.api.querySelector("textarea");
    if (this.#currentText !== ta.value) {
      this.#currentText = ta.value;
      let spans = new SpanMaker(ta.value).paras().makeSpans();
      el.innerHTML = spans.output();
    }
  }

  setLetter(event, _el) {
    this.#currentLetter = event.target.dataset.letter;
    console.log(this.#currentLetter);
  }
}
