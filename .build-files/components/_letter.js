class Letter {
  constructor(letter) {
    this.char = letter;
    this.initColorPrefixes();
    this.previousUpdate = {};
  }

  initColorPrefixes() {
    this.colorPrefixes = {};
    colorSet.forEach((line) => {
      const parts = line.split("|");
      this.colorPrefixes[parts[0]] = new ColorPrefix(
        parts[6],
      );
    });
  }

  // initProps() {
  //   this.props = {};
  //   propSet.forEach((line) => {
  //     const parts = line.split("|");
  //     this.props[parts[0]] = new Prop(
  //       parts[0],
  //       parseInt(parts[2]),
  //       parseInt(parts[3]),
  //       parseInt(parts[7]),
  //       parseInt(parts[8]),
  //     );
  //   });
  // }

  // // TODO: Deprecate this
  // setColorL(value) {
  //   this.colors["color-l"].setValue(value);
  // }

  setColorPrefix(prefix, value) {
    // console.log(prefix);
    // console.log(value);
    //console.log(this.colors[prefix].value());
    this.colorPrefixes[prefix].setCurrentValue(value);
    // console.log(this.colorPrefixes[prefix].currentValue());
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

  applyColorPrefixes() {
    Object.entries(this.colorPrefixes).forEach(([prefix, details]) => {
      const key = `--${prefix}-${this.char}`;
      if (this.previousUpdate[key] !== details.currentValueString()) {
        const value = details.currentValueString();
        document.documentElement.style.setProperty(key, value);
        this.previousUpdate[key] = value;
      }
    });
  }
}
