class Letter {
  constructor(letter, colorSeeds, propSeeds) {
    this.letter = letter;
    this.initColors(colorSeeds);
    this.initProps(propSeeds);
  }

  initColors(colorSeeds) {
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
        colorSeeds.seeds[parts[0]].currentSeed(),
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
    Object.entries(this.colors).forEach(([_, color]) => {
      const varKey = `--${color.prefix}-${this.letter}`;
      document.documentElement.style.setProperty(varKey, color.valueString());
    });
  }
}
