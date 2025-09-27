class Letter {
  constructor(letter, colorSeeds, propSeeds) {
    this.letter = letter;
    this.colorSeeds = colorSeeds;
    this.propSeeds = propSeeds;
    this.setColorDelay(3000);
    this.initColors();
    this.initProps();
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
        this.colorSeeds.seeds,
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

  setColorL(value) {
    this.colors["color-l"].setValue(value);
  }

  setColorDelay(ms) {
    const key = `--color-transition-${this.letter}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  setMinorColorUpdateFromSeeds() {
    Object.entries(this.colors).forEach(([_, color]) => {
      color.pushMinorRandomValueFromSeed();
    });
  }

  applyColor() {
    Object.entries(this.colors).forEach(([_, color]) => {
      const key = `--${color.prefix}-${this.letter}`;
      const value = color.value();
      document.documentElement.style.setProperty(key, value);
    });
  }
}
