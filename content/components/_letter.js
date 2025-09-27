class Letter {
  constructor(letter, colorSeeds, propSeeds) {
    this.letter = letter;
    this.setColorTransitionTime(1200);
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
        colorSeeds.seeds[parts[0]].value(),
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

  setColorTransitionTime(ms) {
    const key = `--color-transition-${this.letter}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  updateVarsForLetter() {
    Object.entries(this.colors).forEach(([_, color]) => {
      const varKey = `--${color.prefix}-${this.letter}`;
      document.documentElement.style.setProperty(varKey, color.value());
    });
  }
}
