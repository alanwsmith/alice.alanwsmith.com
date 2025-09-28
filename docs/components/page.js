let loopCount = 0;

export default class {
  async bittyInit() {
    addBaseStyleSheet();
    // Must set to zero to start
    setAllOfType("font-s", 0);
    setAllOfType("font-t", 0);
    setAllOfType("font-t2", 0);
    setAllFontsToSize(2.5);
    setAllOfPrefix("SKLD", 900);
    setAllOfPrefix("TRMF", 800);
    setAllOfPrefix("TRMK", 800);
    setAllOfPrefix("TRML", 800);
    setAllOfPrefix("color-l", 0);
    setAllOfPrefix("color-c", 0);
    setAllOfPrefix("color-h", 0);
    setAllOfType("color-transition", 2000);
    setAllOfType("font-transition", 2200);
    setAllOfType("size-transition", 2200);
    applyUpdates();
  }

  loadInput(_event, el) {
    const spanMaker = new SpanMaker(el.innerText);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
    this.api.forward(null, "inputPayload");
  }

  inputPayload(_event, el) {
    el.innerHTML = this.spans;
  }

  async startUpdates(_event, el) {
    await sleep(200);
    generateSeed("color-l", 74, 86);
    generateSeed("color-c", 14, 24);
    generateSeed("color-h", 0, 360);
    prepAllFromSeed("color", "small");
    applyUpdates();
    await sleep(2000);

    setAllOfPrefix("SKLD", 200);
    setAllOfPrefix("TRMF", 200);
    setAllOfPrefix("TRMK", 200);
    setAllOfPrefix("TRML", 200);
    applyUpdates();

    pickColors();
    pickShapes();

    // await sleep(200);

    // setAllOfType("font-s", 300);
    // setAllOfType("font-t", 300);
    //  setAllOfType("font-t2", 300);

    //console.log(state.letters["a"]);
    // applyUpdates();
    // pickColors();
    // pickShapes();

    // await sleep(100);
    // pickOne("font-t");
    // generateSeed("color-l", 74, 86);
    // generateSeed("color-c", 10, 18);
    // generateSeed("color-h", 0, 360);
    // generateSeeds("font", 100, 300);
    // prepAllFromSeed("color", "small");
    // prepAllFromSeed("font", "default");
    // applyUpdates();
    // await sleep(5200);
    // shiftLoop();
  }
}

async function pickColors() {
  generateSeed("color-l", 74, 86);
  generateSeed("color-c", 10, 100);
  generateSeed("color-h", 0, 360);
  prepAllFromSeed("color", "small");
  applyUpdates();
  await sleep(5200);
  pickColors();
}

async function pickShapes() {
  pickOne("font-t");
  generateSeeds("font", 100, 500);
  prepAllFromSeed("font", "default");
  applyUpdates();
  await sleep(1000);
  pickShapes();
}

async function shiftLoop() {
  loopCount += 1;
  pickOne("font-t");
  if (loopCount % 5 === 0) {
    generateSeeds("font", 500, 700);
    // generateRandomSeeds("font-t");
    shiftSeed("color-h", "small");
    prepAllFromSeed("color", "xsmall");
    //generateSeed("color-c", 70, 180);
  } else {
    generateSeeds("font", 100, 200);
    generateSeed("color-h", 0, 360);
    prepAllFromSeed("color", "default");
  }
  shiftSeed("color-c", "xlarge");
  prepAllFromSeed("font", "default");
  applyUpdates();
  await sleep(5200);
  shiftLoop();
}

function setAllFontsToSize(size) {
  arrayOfLetters().forEach((letter) => {
    // console.log(letter.char);
    setProp("font-size", letter.char, size);
  });
}

function pickOne(type) {
  const pick = randomInt(0, arrayOfSeeds(type).length - 1);
  arrayOfLetters().forEach((letter) => {
    arrayOfSeeds(type).forEach((seed, index) => {
      // console.log(letter.char);
      // console.log(seed.prefix);
      if (index === pick) {
        setProp(seed.prefix, letter.char, randomInt(400, 1000));
      } else {
        setProp(seed.prefix, letter.char, 0);
      }
      // console.log(pick);
      // console.log(seed);
    });
  });
}

function shiftSeed(prefix, amount) {
  seedTypes().forEach((type) => {
    arrayOfSeeds(type).forEach((seed) => {
      if (prefix === seed.prefix) {
        setSeed(
          prefix,
          randomShift(
            seed.next_value,
            seed.min,
            seed.max,
            seed.moves[amount],
            randomDirection(),
          ),
        );
      }
    });
  });
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
          letter.props[seed.prefix].previous_value !==
            getNextPrefixValue(letter.char, seed.prefix)
        ) {
          const key = `--${seed.prefix}-${letter.char}`;
          const value = `${letter.props[seed.prefix].next_value}${
            propUnit(seed.prefix)
          }`;
          // if (letter.char === "a") {
          //   console.log(`${key} - ${value}`);
          // }
          document.documentElement.style.setProperty(
            key,
            value,
          );
          letter.props[seed.prefix].previous_value = getNextPrefixValue(
            letter.char,
            seed.prefix,
          );
        }
      });
    });
  });
}

function seedTypes() {
  const seedTypeSet = new Set();
  Object.entries(state.seeds).forEach(([_, seed]) => {
    seedTypeSet.add(seed.type);
    //console.log(seed.type);
  });
  return [...seedTypeSet];

  //console.log(seedTypeSet);
  // console.log(state.seeds);

  //return ["color", "color-transition", "font", "font-transition"];
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
      setProp(seed.prefix, letter.char, value);
    });
  });
}

function matchTransitionSeeds() {
  state.seeds["font-transition"].previous_value = getNextSeedValue(
    "font-transition",
  );
  state.seeds["font-transition"].next_value = getNextSeedValue(
    "color-transition",
  );
}

function setSeed(prefix, value) {
  state.seeds[prefix].previous_value = getNextSeedValue(prefix);
  state.seeds[prefix].next_value = value;
}

function getNextSeedValue(prefix) {
  // Necessary to pull values out instead of
  // getting a reference.
  return state.seeds[prefix].next_value;
}

function getNextPrefixValue(char, prefix) {
  // Necessary to pull values out instead of
  // getting a reference.
  return state.letters[char].props[prefix].next_value;
}

function setProp(prefix, char, value) {
  state.letters[char].props[prefix].previous_value = getNextPrefixValue(
    char,
    prefix,
  );
  state.letters[char].props[prefix].next_value = value;
  // if (char === "a") {
  //   console.log(`${prefix} - ${char} - ${value}`);
  // }
}

function setAllOfPrefix(prefix, value) {
  arrayOfLetters().forEach((letter) => {
    setProp(prefix, letter.char, value);
  });
}

function setAllOfType(type, value) {
  arrayOfSeeds(type).forEach((seed) => {
    arrayOfLetters().forEach((letter) => {
      setProp(seed.prefix, letter.char, value);
    });
  });
}

function generateRandomSeed(prefix, min, max) {
  // setSeed(prefix));
}

function generateRandomSeeds(type, min, max) {
  arrayOfSeeds(type).forEach((seed) => {
    generateRandomSeed(seed.prefix, min, max);
  });
}

function generateSeed(prefix, min, max) {
  //console.log(prefix);
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

function fontVariations(char) {
  const prefixes = [];
  arrayOfSeeds("font-s").forEach((seed) => {
    prefixes.push(seed.prefix);
  });
  arrayOfSeeds("font-t").forEach((seed) => {
    prefixes.push(seed.prefix);
  });
  arrayOfSeeds("font-t2").forEach((seed) => {
    prefixes.push(seed.prefix);
  });
  const output = prefixes.map((prefix) => {
    return `"${prefix}" var(--${prefix}-${char})`;
  });
  return (output.join(",\n"));
}

function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];

  styles.push(
    ":root { --color-easing: linear; }",
    ":root { --font-easing: linear; }",
    ":root { --size-easing: linear; }",
  );

  // styles.push(
  //   ":root { --color-easing: ease; }",
  //   ":root { --font-easing: ease; }",
  //   ":root { --size-easing: ease; }",
  // );

  styles.push(`.output { 
    font-size: var(--font-size-q);
    color: lch(var(--color-l-q) var(--color-c-q) var(--color-h-q) ); 
    transition: 
      color var(--color-transition-q) var(--color-easing),
      font-variation-settings var(--font-transition-q) var(--font-easing);
    font-variation-settings: 
      ${fontVariations("q")};
}`);
  arrayOfLetters().forEach((details) => {
    const letter = details.char;
    styles.push(`.letter-${letter} {
        font-size: var(--font-size-${letter});
        color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) );
        transition: 
          color var(--color-transition-${letter}) var(--color-easing),
          font-variation-settings var(--font-transition-${letter}) var(--font-easing);
        font-variation-settings:
          ${fontVariations(letter)};
}`);
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
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "b": {
      "char": "b",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "c": {
      "char": "c",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "d": {
      "char": "d",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "e": {
      "char": "e",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "f": {
      "char": "f",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "g": {
      "char": "g",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "h": {
      "char": "h",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "i": {
      "char": "i",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "j": {
      "char": "j",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "k": {
      "char": "k",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "l": {
      "char": "l",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "m": {
      "char": "m",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "n": {
      "char": "n",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "o": {
      "char": "o",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "p": {
      "char": "p",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "q": {
      "char": "q",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "r": {
      "char": "r",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "s": {
      "char": "s",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "t": {
      "char": "t",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "u": {
      "char": "u",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "v": {
      "char": "v",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "w": {
      "char": "w",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "x": {
      "char": "x",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "y": {
      "char": "y",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
    "z": {
      "char": "z",
      "props": {
        "SKLA": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLB": {
          "next_value": null,
          "previous_value": null,
        },
        "SKLD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMB": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMC": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMD": {
          "next_value": null,
          "previous_value": null,
        },
        "TRME": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMF": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMG": {
          "next_value": null,
          "previous_value": null,
        },
        "TRMK": {
          "next_value": null,
          "previous_value": null,
        },
        "TRML": {
          "next_value": null,
          "previous_value": null,
        },
        "color-c": {
          "next_value": null,
          "previous_value": null,
        },
        "color-h": {
          "next_value": null,
          "previous_value": null,
        },
        "color-l": {
          "next_value": null,
          "previous_value": null,
        },
        "color-transition": {
          "next_value": null,
          "previous_value": null,
        },
        "font-size": {
          "next_value": null,
          "previous_value": null,
        },
        "font-transition": {
          "next_value": null,
          "previous_value": null,
        },
      },
    },
  },
  "seeds": {
    "SKLA": {
      "max": "460",
      "min": "0",
      "moves": {
        "default": "120",
        "large": "200",
        "small": "60",
        "xlarge": "300",
        "xsmall": "20",
      },
      "next_value": 0,
      "prefix": "SKLA",
      "previous_value": 0,
      "type": "font-s",
      "unit": "",
    },
    "SKLB": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "SKLB",
      "previous_value": 0,
      "type": "font-s",
      "unit": "",
    },
    "SKLD": {
      "max": "400",
      "min": "0",
      "moves": {
        "default": "120",
        "large": "200",
        "small": "60",
        "xlarge": "300",
        "xsmall": "20",
      },
      "next_value": 0,
      "prefix": "SKLD",
      "previous_value": 0,
      "type": "font-s",
      "unit": "",
    },
    "TRMB": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMB",
      "previous_value": 0,
      "type": "font-t",
      "unit": "",
    },
    "TRMC": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMC",
      "previous_value": 0,
      "type": "font-t",
      "unit": "",
    },
    "TRMD": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMD",
      "previous_value": 0,
      "type": "font-t",
      "unit": "",
    },
    "TRME": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRME",
      "previous_value": 0,
      "type": "font-t",
      "unit": "",
    },
    "TRMF": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMF",
      "previous_value": 0,
      "type": "font-t2",
      "unit": "",
    },
    "TRMG": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMG",
      "previous_value": 0,
      "type": "font-t",
      "unit": "",
    },
    "TRMK": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRMK",
      "previous_value": 0,
      "type": "font-t2",
      "unit": "",
    },
    "TRML": {
      "max": "1000",
      "min": "0",
      "moves": {
        "default": "300",
        "large": "450",
        "small": "150",
        "xlarge": "700",
        "xsmall": "90",
      },
      "next_value": 0,
      "prefix": "TRML",
      "previous_value": 0,
      "type": "font-t2",
      "unit": "",
    },
    "color-c": {
      "max": "140",
      "min": "0",
      "moves": {
        "default": "30",
        "large": "60",
        "small": "18",
        "xlarge": "90",
        "xsmall": "10",
      },
      "next_value": 0,
      "prefix": "color-c",
      "previous_value": 0,
      "type": "color",
      "unit": "",
    },
    "color-h": {
      "max": "360",
      "min": "0",
      "moves": {
        "default": "170",
        "large": "240",
        "small": "90",
        "xlarge": "300",
        "xsmall": "50",
      },
      "next_value": 0,
      "prefix": "color-h",
      "previous_value": 0,
      "type": "color",
      "unit": "",
    },
    "color-l": {
      "max": "90",
      "min": "60",
      "moves": {
        "default": "15",
        "large": "20",
        "small": "10",
        "xlarge": "30",
        "xsmall": "5",
      },
      "next_value": 0,
      "prefix": "color-l",
      "previous_value": 0,
      "type": "color",
      "unit": "%",
    },
    "color-transition": {
      "max": "7000",
      "min": "0",
      "moves": {
        "default": "1000",
        "large": "3000",
        "small": "300",
        "xlarge": "4500",
        "xsmall": "100",
      },
      "next_value": 0,
      "prefix": "color-transition",
      "previous_value": 0,
      "type": "color-transition",
      "unit": "ms",
    },
    "font-size": {
      "max": "3.0",
      "min": "0.9",
      "moves": {
        "default": "0.5",
        "large": "0.6",
        "small": "0.3",
        "xlarge": "0.7",
        "xsmall": "0.2",
      },
      "next_value": 0,
      "prefix": "font-size",
      "previous_value": 0,
      "type": "font-size",
      "unit": "rem",
    },
    "font-transition": {
      "max": "7000",
      "min": "0",
      "moves": {
        "default": "1000",
        "large": "3000",
        "small": "300",
        "xlarge": "4500",
        "xsmall": "100",
      },
      "next_value": 0,
      "prefix": "font-transition",
      "previous_value": 0,
      "type": "font-transition",
      "unit": "ms",
    },
  },
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
      if (line.trim() === "") {
        parasIndex += 1;
      } else {
        this.textParagraphs[parasIndex] += `${line} `;
        // console.log(`LINE: ${line}`);
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
        //.replaceAll(`"`, "")
        // .replaceAll(`?`, "")
        // .replaceAll(`-`, " ")
        // .replaceAll(`)`, "")
        // .replaceAll(`(`, "")
        .replaceAll(/\s\s+/g, " ").split(" ");
    });
    return this;
  }

  makeSpans() {
    this.spanParagraphs = this.wordParagraphs.map((para) => {
      let content = para.map((word) => {
        let content2 = [
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
                `<span class="letter-alt letter-q">`,
                char,
                `</span>`,
              ].join("");
            }
          }).join(""),
          `</div>`,
        ].join("");
        return content2;
      }).join(``);
      return content;
    });
    return this;
  }

  output() {
    return `<div class="pAlt">${
      this.spanParagraphs.join(
        '</div><div class="pAlt">',
      )
    }</div>`;
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
