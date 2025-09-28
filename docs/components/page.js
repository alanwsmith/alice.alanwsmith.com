export default class {
  async bittyInit() {
    this.spans = null;
    addBaseStyleSheet();
    setAll("color-l", 0);
    setAll("color-c", 0);
    setAll("color-h", 0);
    setAll("color-transition", 0);
    setAll("font-transition", 0);
    generateSeeds("font", 100, 200);
    prepAllFromSeed("font", "default");
    generateSeed("color-transition", 300, 600);
    //matchTransitionSeeds();
    prepAllFromSeed("color-transition", "default");
    prepAllFromSeed("font-transition", "default");
    applyUpdates();

    // setAll("color-transition", 1000);
    // applyUpdates();
    // await sleep(1000);
    // prepAllFromSeed( "color","default");
    // applyUpdates();
    // await sleep(1000);
    // console.log("asdf");
    // prepAllFromSeed("default", "color");

    // applyUpdates();
    // console.log(state.letters["a"]);
  }

  injestInput(_event, el) {
    const spanMaker = new SpanMaker(el.value);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
  }

  loadInput(_event, el) {
    el.innerHTML = this.spans;
  }

  async startUpdates(_event, _el) {
    await sleep(100);
    generateSeed("color-l", 60, 76);
    generateSeed("color-c", 30, 78);
    generateSeed("color-h", 0, 360);
    prepAllFromSeed("color", "default");
    applyUpdates();

    // applyUpdates();
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function propUnit(prefix) {
  for (let type of seedTypes()) {
    for (let seed of arrayOfSeeds(type)) {
      if (seed.prefix === prefix) {
        return seed.unit;
      }
    }
  }
}

function applyUpdates() {
  arrayOfLetters().forEach((letter) => {
    seedTypes().forEach((type) => {
      arrayOfSeeds(type).forEach((seed) => {
        if (
          letter.props[seed.prefix].previous_value !=
            letter.props[seed.prefix].next_value
        ) {
          const key = `--${seed.prefix}-${letter.char}`;
          const value = `${letter.props[seed.prefix].next_value}${
            propUnit(seed.prefix)
          }`;
          // console.log(`${key} - ${value}`);
          document.documentElement.style.setProperty(
            key,
            value,
          );
          letter.props[seed.prefix].previous_value =
            letter.props[seed.prefix].next_value;
        }
      });
    });
  });
}

function seedTypes() {
  return ["color", "color-transition", "font", "font-transition"];
}

function randomShift(position, min, max, distance, direction) {
  // console.log(`${position} ${min} ${max} ${base} ${direction}`);
  const move = randomInt(0, distance);
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += direction;
    if (position >= max) {
      direction = -1;
    } else if (position <= min) {
      direction = 1;
    }
  }
  return position;
}

function randomDirection() {
  return randomInt(0, 1) === 1 ? 1 : -1;
}

function prepAllFromSeed(type, distance) {
  arrayOfLetters().forEach((letter) => {
    arrayOfSeeds(type).forEach((seed) => {
      const value = randomShift(
        seed.next_value,
        seed.min,
        seed.max,
        seed.moves[distance],
        randomDirection(),
      );
      setProp(letter.char, seed.prefix, value);
    });
  });
}

function matchTransitions() {
  // state.seeds["font-transition"].previous_value =
  //   state.seeds["font-transition"].next_value;
  // state.seeds["font-transition"].next_value =
  //   state.seeds["color-transition"].next_value;
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

function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];
  styles.push(`:root{
--default-font-size: 1.0rem;
--letter-font-size: 2.7rem;
}`);

  styles.push(`.output { 
    font-size: var(--default-font-size);
    color: lch(var(--color-l-q) var(--color-c-q) var(--color-h-q) ); 
    transition-property: color;
    transition-duration: var(--color-transition-q);
    font-variation-settings: 
      'BLDA' var(--BLDA-q), 
      'BLDB' var(--BLDB-q), 
      'SKLA' var(--SKLA-q), 
      'SKLB' var(--SKLB-q), 
      'SKLD' var(--SKLD-q), 
      'TRMA' var(--TRMA-q), 
      'TRMB' var(--TRMB-q), 
      'TRMC' var(--TRMC-q), 
      'TRMD' var(--TRMD-q), 
      'TRME' var(--TRME-q), 
      'TRMF' var(--TRMF-q), 
      'TRMG' var(--TRMG-q), 
      'TRMK' var(--TRMK-q), 
      'TRML' var(--TRML-q);}`);

  arrayOfLetters().forEach((details) => {
    const letter = details.char;
    styles.push(`.letter-${letter} {
        font-size: var(--letter-font-size);
        color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) );
        transition-property: color;
        transition-duration: var(--color-transition-${letter});
        font-variation-settings:
          'BLDA' var(--BLDA-${letter}),
          'BLDB' var(--BLDB-${letter}),
          'SKLA' var(--SKLA-${letter}),
          'SKLB' var(--SKLB-${letter}),
          'SKLD' var(--SKLD-${letter}),
          'TRMA' var(--TRMA-${letter}),
          'TRMB' var(--TRMB-${letter}),
          'TRMC' var(--TRMC-${letter}),
          'TRMD' var(--TRMD-${letter}),
          'TRME' var(--TRME-${letter}),
          'TRMF' var(--TRMF-${letter}),
          'TRMG' var(--TRMG-${letter}),
          'TRMK' var(--TRMK-${letter}),
          'TRML' var(--TRML-${letter});}`);
  });

  stylesSheet.replaceSync(styles.join("\n"));
  document.adoptedStyleSheets.push(stylesSheet);
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
      "next_value": 0,
      "prefix": "BLDA",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "BLDB",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "SKLA",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "SKLB",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "SKLD",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMA",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMB",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMC",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMD",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRME",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMF",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMG",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRMK",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "TRML",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "color-c",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "color-h",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "color-l",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "color-transition",
      "previous_value": 0,
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
      "next_value": 0,
      "prefix": "font-transition",
      "previous_value": 0,
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
