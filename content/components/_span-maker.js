const SpanMaker = class {
  constructor(text) {
    this.text = text;
    this.textParagraphs = [];
    this.wordParagraphs = [];
    this.spanParagraphs = [];
  }

  isLetter(char) {
    let code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }

  makeParagraphs() {
    let parasIndex = 0;
    this.text.split("\n").forEach((line) => {
      if (!this.textParagraphs[parasIndex]) {
        this.textParagraphs.push("");
      }
      if (line.trim() === "") {
        parasIndex += 1;
      } else {
        this.textParagraphs[parasIndex] += `${line} `;
        console.log(`LINE: ${line}`);
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
        //.replaceAll(`"`, "")
        // .replaceAll(`?`, "")
        // .replaceAll(`-`, " ")
        // .replaceAll(`)`, "")
        // .replaceAll(`(`, "")
        .replaceAll(/\s\s+/g, " ").split(" ");
    });
    return this;
  }

  makeSpans() {
    this.spanParagraphs = this.wordParagraphs.map((para) => {
      let content = para.map((word) => {
        let content2 = [
          `<div class="word">`,
          word.trim().split("").map((char) => {
            if (this.isLetter(char)) {
              return [
                `<span class="letter letter-`,
                char.toLowerCase(),
                `">`,
                char,
                `</span>`,
              ].join("");
            } else {
              return [
                `<span class="letter-alt">`,
                char,
                `</span>`,
              ].join("");
            }
          }).join(""),
          `</div>`,
        ].join("");
        return content2;
      }).join(``);
      return content;
    });
    return this;
  }

  output() {
    return `<div class="pAlt">${
      this.spanParagraphs.join(
        '</div><div class="pAlt">',
      )
    }</div>`;
  }
};
