class Letter {
  constructor(letter, colorSeeds, propSeeds) {
    this.char = letter;
    this.lastApplied = {};
    this.setColorDelay(3000);
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
        colorSeeds.seeds,
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
    const key = `--color-transition-${this.char}`;
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
      if (this.lastApplied[color.prefix] !== color.value) {
        const key = `--${color.prefix}-${this.char}`;
        const value = color.value();
        document.documentElement.style.setProperty(key, value);
        this.lastApplied[color.prefix] = color.value;
      }
    });
  }

  setColor(prefix, value) {
    this.colors[prefix].setValue(value);
  }
}
