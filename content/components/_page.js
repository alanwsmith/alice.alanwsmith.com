export default class {
  bittyInit() {
    this.spans = null;
    setAll("color-l", 70);
    setAll("color-c", 50);
    setAll("color-h", 40);
    setAll("color-transition", 0);
    setAll("font-transition", 0);
    generateSeed("color-l", 60, 76);
    generateSeed("color-c", 30, 78);
    generateSeed("color-h", 0, 360);
    generateSeed("color-transition", 3000, 4000);
    matchTransitionSeeds();
    generateSeeds("font", 100, 400);
    console.log(state);
  }

  injestInput(_event, el) {
    const spanMaker = new SpanMaker(el.value);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
  }

  loadInput(_event, el) {
    el.innerHTML = this.spans;
  }
}

function matchTransitionSeeds() {
  state.seeds["font-transition"].previous_value =
    state.seeds["font-transition"].next_value;
  state.seeds["font-transition"].next_value =
    state.seeds["color-transition"].next_value;
}

function setSeed(prefix, value) {
  state.seeds[prefix].previous_value = state.seeds[prefix].next_value;
  state.seeds[prefix].next_value = value;
}

function setProp(char, prefix, value) {
  state.letters[char].props[prefix].previous_value =
    state.letters[char].props[prefix].next_value;
  state.letters[char].props[prefix].next_value = value;
}

function setAll(prefix, value) {
  arrayOfLetters().forEach((letter) => {
    setProp(letter.char, prefix, value);
  });
}

function generateSeed(prefix, min, max) {
  setSeed(prefix, randomInt(min, max));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateSeeds(type, min, max) {
  arrayOfSeeds(type).forEach((seed) => {
    generateSeed(seed.prefix, min, max);
  });
}

function arrayOfSeeds(type) {
  return Object.entries(state.seeds).filter(([prefix, details]) => {
    return details.type === type;
  }).map(([prefix, details]) => {
    return details;
  });
}

function arrayOfLetters() {
  return Object.entries(state.letters).map(([char, letter]) => letter);
}
