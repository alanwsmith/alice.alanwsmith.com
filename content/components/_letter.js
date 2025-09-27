class Letter {
  constructor(letter) {
    this.char = letter;
    this.initColorPrefixes();
    this.previousUpdates = {};
    this.nextUpdate = [];
  }

  applyUpdates() {
    this.nextUpdate.forEach((update) => {
      if (this.previousUpdates[update.key] !== update.value) {
        const key = `${update.key}-${this.char}`;
        document.documentElement.style.setProperty(key, update.value);
        this.previousUpdates[update.key] = update.value;
      }
    });
    this.nextUpdate = [];
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

  loadUpdate(details) {
    //console.log(details);
    this.nextUpdate.push(details);
    //document.documentElement.style.setProperty(key, value);
    //const key = `--${prefix}-${this.char}`;
    // console.log(details);
    // console.log(this.nextUpdate);
  }

  setColorDelay(ms) {
    const key = `--color-transition-${this.char}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  setColorPrefix(prefix, value) {
    this.colorPrefixes[prefix].setCurrentValue(value);
  }

  getCurrentColorPrefixValueString(prefix) {
    //console.log(this.colorPrefixes[prefix]);
    return this.colorPrefixes[prefix].currentValueString();
  }
}
