class Letters {
  constructor() {
    this.colorSeeds = new ColorSeeds();
    this.propSeeds = new PropSeeds();
    this.letters = {};
    letters().forEach((letter) => {
      this.letters[letter] = new Letter(
        letter,
        this.colorSeeds,
        this.propSeeds,
      );
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
