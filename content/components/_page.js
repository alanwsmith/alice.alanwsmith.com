export default class {
  bittyInit() {
    this.spans = null;
    initLetterColors();
    setAllColorTransitions(0);
    // initColorTransitions();
    //initSeeds();
    // initLetters();
  }

  injestInput(_event, el) {
    const spanMaker = new SpanMaker(el.value);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
  }

  loadInput(_event, el) {
    el.innerHTML = this.spans;
  }
}

function arrayOfLetterObjects() {
  for (let [prefix, details] of Object.entries(state.letters[char].vars)) {
    if (listOfColorPrefixes().includes(prefix)) {
      details.next_value = 0;
    }
  }
  return [];
}

function setAllColorTransitions(value) {
  arrayOfLetterObjects().forEach((letterObject) => {
    console.log(letterObject);
  });

  // listOfLetters().forEach((char) => {
  //   for (let [prefix, details] of Object.entries(state.letters[char].vars)) {
  //     if (listOfColorPrefixes().includes(prefix)) {
  //       details.next_value = 0;
  //     }
  //   }
  // });
}

function listOfLetters() {
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
//     for (let [prefix, details] of Object.entries(state.letters[char].vars)) {
//       if (listOfColorPrefixes().includes(prefix)) {
//         details.next_value = 0;
//       }
//     }
//   });
// }

function initLetterColors() {
  listOfLetters().forEach((char) => {
    for (let [prefix, details] of Object.entries(state.letters[char].vars)) {
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
