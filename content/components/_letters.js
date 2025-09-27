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
  }
}
