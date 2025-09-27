class Letter {
  constructor(letter) {
    this.char = letter;
    this.initColorPrefixes();
    this.previousUpdates = {};
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

  setColorPrefix(prefix, value) {
    this.colorPrefixes[prefix].setCurrentValue(value);
  }

  setColorDelay(ms) {
    const key = `--color-transition-${this.char}`;
    const value = `${ms}ms`;
    document.documentElement.style.setProperty(key, value);
  }

  applyColorPrefixes() {
    Object.entries(this.colorPrefixes).forEach(([prefix, details]) => {
      const key = `--${prefix}-${this.char}`;
      if (this.previousUpdates[key] !== details.currentValueString()) {
        const value = details.currentValueString();
        document.documentElement.style.setProperty(key, value);
        this.previousUpdates[key] = value;
      }
    });
  }
}
