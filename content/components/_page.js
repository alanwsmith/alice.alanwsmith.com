export default class {
  bittyInit() {
    this.spans = null;
    setAll("color-l", 0);
    setAll("color-c", 0);
    setAll("color-h", 0);
    setAll("color-transition", 0);
    setAll("font-transition", 0);
    generateSeed("color-l", 60, 76);
    generateSeed("color-c", 30, 78);
    generateSeed("color-h", 0, 360);
    generateSeed("color-transition", 3000, 4000);
    matchTransitionSeeds();
    generateSeeds("font", 100, 400);
    console.log(state.seeds);
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
  listOfLetterChars().forEach((char) => {
    setProp(char, prefix, value);
  });
}

function generateSeed(prefix, min, max) {
  state.seeds[prefix].previous_value = state.seeds[prefix].next_value;
  state.seeds[prefix].next_value = randomInt(min, max);
}

function generateColorTransitionSeed(min, max) {
  arrayOfSeeds("color-transition").forEach((seed) => {
    seed.next_value = randomInt(min, max);
  });
}

function generateColorSeed(prefix, min, max) {
  arrayOfSeeds("color").forEach((seed) => {
    if (seed.prefix === prefix) {
      seed.next_value = randomInt(min, max);
    }
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateSeeds(min, max) {
  arrayOfSeeds("font").forEach((seed) => {
    generateSeed(seed.prefix, min, max);
  });
}

// function generateRandomFontSeeds() {
//   arrayOfFontSeeds().forEach((seed) => {
//     seed.next_value = randomInt(seed.min, seed.max);
//   });
// }

function arrayOfSeeds(type) {
  return Object.entries(state.seeds).filter(([prefix, details]) => {
    return details.type === type;
  }).map(([prefix, details]) => {
    return details;
  });
}

function arrayOfFontSeeds() {
  return Object.entries(state.seeds).filter(([prefix, details]) => {
    return details.type === "font";
  }).map(([prefix, details]) => {
    return details;
  });
}

function arrayOfColorSeeds() {
  return Object.entries(state.seeds).filter(([prefix, details]) => {
    return details.type === "color";
  }).map(([prefix, details]) => {
    return details;
  });
}

function setLetterProp(char, prop, value) {
  state.letters[char].props[prop].next_value = value;
}

function arrayOfLetter() {
  return Object.entries(state.letters).map(([prefix, details]) => {
    return details;
  });
}

function setColorTransition(char, value) {
  state.letters[char].props["color-transition"].next_value = value;
}

function setAllColorTransitions(value) {
  listOfLetterChars().forEach((char) => {
    setLetterProp(char, "color-transition", value);
  });
}

// function setAllColorL(value) {
//   listOfLetterChars().forEach((char) => {
//     setLetterProp(char, "color-l", value);
//   });
// }

// function setAllColorC(value) {
//   listOfLetterChars().forEach((char) => {
//     setLetterProp(char, "color-c", value);
//   });
// }

// function setAllColorH(value) {
//   listOfLetterChars().forEach((char) => {
//     setLetterProp(char, "color-h", value);
//   });
// }

function listOfLetterChars() {
  return Object.keys(state.letters).map((char) => char);
}

function listOfColorPrefixes() {
  return Object.entries(state.seeds).filter(([prefix, seed]) => {
    return seed.type === "color";
  }).map(([prefix, seed]) => prefix);
}

function listOfTransitionPrefixes() {
  return Object.entries(state.seeds).filter(([prefix, seed]) => {
    return seed.type === "color-transition";
  }).map(([prefix, seed]) => prefix);
}

function listOfAllPrefixes() {
  return Object.keys(state.props).map((prefix) => prefix);
}

// function initColorTransitions() {
//   listOfLetters().forEach((char) => {
//     for (let [prefix, details] of Object.entries(state.letters[char].props)) {
//       if (listOfColorPrefixes().includes(prefix)) {
//         details.next_value = 0;
//       }
//     }
//   });
// }

function initLetterColors() {
  listOfLetterChars().forEach((char) => {
    for (let [prefix, details] of Object.entries(state.letters[char].props)) {
      if (listOfColorPrefixes().includes(prefix)) {
        details.next_value = 0;
      }
    }
  });
}

function getProp(prefix) {
}

// function generateSeed(prefix, key) {
//   if (key === "initial") {
//     console.log(prop);
//   }
// }

function initSeeds() {
  //   state.props.forEach((prop) => {
  //     prop.currentSeed = null;
  //     prop.previousSeed = null;
  //   });
  //   arrayOfPrefixes().forEach((prefix) => {
  //     generateSeed(prefix, "initial");
  //   });
}

function initLetters() {
  arrayOfChars().forEach((char) => {
    console.log(state.letters[char]);
  });
}
