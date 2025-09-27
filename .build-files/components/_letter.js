class Letters {
  constructor() {
    this.colorSeeds = new ColorSeeds();
    this.propSeeds = new PropSeeds();
    this.letters = {};
    letters().forEach((letter) => {
      this.letters[letter] = new Letter(letter);
    });
  }

  addBaseStyles() {
    const stylesSheet = new CSSStyleSheet();
    let styles = [];
  }

  updateVarsForLetters() {
    Object.entries(this.letters).forEach(([_, letter]) => {
      letter.updateVarsForLetter();
    });

    // Object.entries(this.colorValues).forEach(([letter, props]) => {
    //   Object.entries(props).forEach(([prop, value]) => {
    //     const flag = `--${prop}-${letter}`;
    //     const unit = prop === "color-l" ? "%" : "";
    //     result.push([
    //       flag,
    //       `${value}${unit}`,
    //     ]);
    //   });
    // });

    //document.documentElement.style.setProperty(sv[0], sv[1]);
  }
}

class Letter {
  constructor(letter) {
    this.letter = letter;
    this.initProps();
    this.initColors();
  }

  initColors() {
    this.colors = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.colors[parts[0]] = new Color(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parts[6],
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
  }

  initProps() {
    this.props = {};
    propSet.forEach((line) => {
      const parts = line.split("|");
      this.props[parts[0]] = new Prop(
        parts[0],
        parseInt(parts[2]),
        parseInt(parts[3]),
        parseInt(parts[7]),
        parseInt(parts[8]),
      );
    });
  }

  updateVarsForLetter() {
    // Object.entries(this.colorValues).forEach(([letter, props]) => {
    //   Object.entries(props).forEach(([prop, value]) => {
    //     const flag = `--${prop}-${letter}`;
    //     const unit = prop === "color-l" ? "%" : "";
    //     result.push([
    //       flag,
    //       `${value}${unit}`,
    //     ]);
    //   });
    // });

    //document.documentElement.style.setProperty(sv[0], sv[1]);
  }
}
