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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateSeeds(min, max) {
  arrayOfSeeds("font").forEach((seed) => {
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
// The state const is auto generated.
const state = {
  "letters": {
    "a": {
      "char": "a",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "b": {
      "char": "b",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "c": {
      "char": "c",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "d": {
      "char": "d",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "e": {
      "char": "e",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "f": {
      "char": "f",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "g": {
      "char": "g",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "h": {
      "char": "h",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "i": {
      "char": "i",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "j": {
      "char": "j",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "k": {
      "char": "k",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "l": {
      "char": "l",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "m": {
      "char": "m",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "n": {
      "char": "n",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "o": {
      "char": "o",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "p": {
      "char": "p",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "q": {
      "char": "q",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "r": {
      "char": "r",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "s": {
      "char": "s",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "t": {
      "char": "t",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "u": {
      "char": "u",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "v": {
      "char": "v",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "w": {
      "char": "w",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "x": {
      "char": "x",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "y": {
      "char": "y",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    },
    "z": {
      "char": "z",
      "props": {
        "BLDA": {
          "next_value": null,
          "previous_value": null
        },
        "BLDB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLA": {
          "next_value": null,
          "previous_value": null
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null
        },
        "TRMA": {
          "next_value": null,
          "previous_value": null
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null
        },
        "TRME": {
          "next_value": null,
          "previous_value": null
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null
        },
        "TRML": {
          "next_value": null,
          "previous_value": null
        },
        "color-c": {
          "next_value": null,
          "previous_value": null
        },
        "color-h": {
          "next_value": null,
          "previous_value": null
        },
        "color-l": {
          "next_value": null,
          "previous_value": null
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null
        }
      }
    }
  },
  "seeds": {
    "BLDA": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "BLDA",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "BLDB": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "BLDB",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "SKLA": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "SKLA",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "SKLB": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "SKLB",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "SKLD": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "SKLD",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMA": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMA",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMB": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMB",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMC": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMC",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMD": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMD",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRME": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRME",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMF": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMF",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMG": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMG",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRMK": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRMK",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "TRML": {
      "max": 1000,
      "min": 0,
      "moves": {
        "default": 300,
        "large": 450,
        "small": 150,
        "xlarge": 700,
        "xsmall": 90
      },
      "next_value": null,
      "prefix": "TRML",
      "previous_value": null,
      "type": "font",
      "unit": ""
    },
    "color-c": {
      "max": 140,
      "min": 0,
      "moves": {
        "default": 30,
        "large": 60,
        "small": 18,
        "xlarge": 90,
        "xsmall": 10
      },
      "next_value": null,
      "prefix": "color-c",
      "previous_value": null,
      "type": "color",
      "unit": ""
    },
    "color-h": {
      "max": 360,
      "min": 0,
      "moves": {
        "default": 120,
        "large": 170,
        "small": 56,
        "xlarge": 210,
        "xsmall": 30
      },
      "next_value": null,
      "prefix": "color-h",
      "previous_value": null,
      "type": "color",
      "unit": ""
    },
    "color-l": {
      "max": 90,
      "min": 60,
      "moves": {
        "default": 15,
        "large": 20,
        "small": 10,
        "xlarge": 30,
        "xsmall": 5
      },
      "next_value": null,
      "prefix": "color-l",
      "previous_value": null,
      "type": "color",
      "unit": "%"
    },
    "color-transition": {
      "max": 7000,
      "min": 0,
      "moves": {
        "default": 1000,
        "large": 3000,
        "small": 300,
        "xlarge": 4500,
        "xsmall": 100
      },
      "next_value": null,
      "prefix": "color-transition",
      "previous_value": null,
      "type": "color-transition",
      "unit": "ms"
    },
    "font-transition": {
      "max": 7000,
      "min": 0,
      "moves": {
        "default": 1000,
        "large": 3000,
        "small": 300,
        "xlarge": 4500,
        "xsmall": 100
      },
      "next_value": null,
      "prefix": "font-transition",
      "previous_value": null,
      "type": "font-transition",
      "unit": "ms"
    }
  }
};
const SpanMaker = class {
  constructor(text) {
    this.text = text;
    this.textParagraphs = [];
    this.wordParagraphs = [];
    this.spanParagraphs = [];
  }

  isLetter(char) {
    let code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  }

  makeParagraphs() {
    let parasIndex = 0;
    this.text.split("\n").forEach((line) => {
      if (!this.textParagraphs[parasIndex]) {
        this.textParagraphs.push("");
      }
      this.textParagraphs[parasIndex] += `${line} `;
      if (line === "") {
        parasIndex += 1;
      }
    });
    return this;
  }

  makeWords() {
    // The word split was originally done so spans
    // could be switch to `display: inline-block` to
    // allow them to be rotated. Decided against
    // the rotation after playing with a little,
    // but leaving the word split in anyway.
    this.wordParagraphs = this.textParagraphs.map((para) => {
      return para
        .replaceAll(`"`, "")
        .replaceAll(`?`, "")
        .replaceAll(`-`, " ")
        .replaceAll(`)`, "")
        .replaceAll(`(`, "")
        .replaceAll(/\s\s+/g, " ").split(" ");
    });
    return this;
  }

  makeSpans() {
    this.spanParagraphs = this.wordParagraphs.map((para) => {
      return para.map((word) => {
        return [
          `<div class="word">`,
          word.trim().split("").map((char) => {
            if (this.isLetter(char)) {
              return [
                `<span class="letter letter-`,
                char.toLowerCase(),
                `">`,
                char,
                `</span>`,
              ].join("");
            } else {
              return [
                `<span class="letter letter-Q letter-alt`,
                `">`,
                char,
                `</span>`,
              ].join("");
            }
          }).join(""),
          `</div>`,
        ].join("");
      }).join(``);
    });
    return this;
  }

  output() {
    return `<p>${this.spanParagraphs.join("</p><p>")}</p>`;
  }
};

// Hey there!
//
// Welcome to the code! This project involved a lot
// of prototyping. There's a bunch of
// cruft left over from that. Other than that
// the big thing to know is that this I'm
// using bitty for this `https://bitty.alanwsmith.com`.
// It's the first real thing I've built with it.
// Helped me refine a bunch. I really like
// the way it's working.
