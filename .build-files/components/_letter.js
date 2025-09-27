class Letter {
  constructor(letter, colorSeeds, propSeeds) {
    this.letter = letter;
    this.colorSeeds = colorSeeds;
    this.propSeeds = propSeeds;
    this.setColorTransitionTime(1200);
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
        this.colorSeeds,
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

  setMinorColorUpdateFromSeeds() {
  }

  setColorTransitionTime(ms) {
    const key = `--color-transition-${this.letter}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  applyColor() {
    Object.entries(this.colors).forEach(([_, color]) => {
      const varKey = `--${color.prefix}-${this.letter}`;
      document.documentElement.style.setProperty(varKey, color.value());
    });
  }
}
