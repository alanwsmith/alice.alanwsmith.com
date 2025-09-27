class Color {
  constructor(prefix, min, max, unit, minor, major, current_seed) {
    this.prefix = prefix;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.minor = minor;
    this.major = major;
    this.values = [];
    this.values.push(100);
  }

  valueString() {
    return `${this.values[this.values.length - 1]}${this.unit}`;
  }

  // currentValue() {
  //   return this.values[this.values.length - 1];
  // }

  //  updateColorVar() {
  //    console.log(this.prefix);
  //    //document.documentElement.style.setProperty(this.prefix, this.valueString());
  //  }
}
