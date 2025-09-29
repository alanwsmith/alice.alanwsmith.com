let loopCount = 0;

export default class {
  async bittyInit() {
    initWithZeros();
    addBaseStyleSheet();
    setAllOfType("color-transition", 1000);
    setAllOfType("font-transition", 1000);
    setAllOfType("size-transition", 1000);
    setBackgroundTransition(8000);
    setAllOfPrefix("SKLA", 900);
    setAllOfPrefix("SKLB", 900);
    setAllOfPrefix("SKLD", 900);
    setAllOfPrefix("TRMF", 900);
    setAllOfPrefix("TRMK", 900);
    setAllOfPrefix("TRMK", 900);
    setAllOfPrefix("TRMG", 900);
    setAllOfPrefix("TRML", 900);
    setAllOfPrefix("font-size", 2.9);
    setAllOfPrefix("color-l", 0);
    setAllOfPrefix("color-c", 0);
    setAllOfPrefix("color-h", 0);
    resizeLetters(30);
    applyUpdates();

    // await sleep(100);
    // applyUpdates();
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
    setAllOfType("color-transition", 4000);
    setAllOfType("font-transition", 5200);
    setAllOfType("size-transition", 200);
    applyUpdates();
    await sleep(1000);
    generateSeed("color-l", 84, 100);
    generateSeed("color-c", 10, 30);
    generateSeed("color-h", 0, 360);
    prepAllFromSeed("color", "default");
    // await sleep(100);

    // arrayOfLetters().forEach((letter) => {
    //   updateLetterWithRandomSetting(letter.char);
    // });

    applyUpdates();

    // setAllOfPrefix("SKLD", 200);
    // setAllOfPrefix("TRMF", 200);
    // setAllOfPrefix("TRMK", 200);
    // setAllOfPrefix("TRML", 200);

    // await sleep(600);
    // doRun();
  }
}

async function switchToSingleFont() {
  arrayOfLetters().forEach((letter) => {
    if (randomInt(0, 2) === 2) {
      updateLetterWithRandomSetting(letter.char);
    }
  });
  //await sleep(4800);
  //pickShapes();
}

async function switchToFontWithDelay(ms) {
}

async function doRun() {
  // pickColors();
  // pickShapes();
  pickBackground();

  //pickSize();

  // console.log(settings.length);
  // arrayOfLetters().forEach((letter) => {
  //   updateLetterWithRandomSetting(letter.char);
  // });
  // await sleep(100);
  // applyUpdates();
}

async function pickSize() {
  arrayOfLetters().forEach((letter) => {
    if (randomInt(0, 2) === 2) {
      setProp(letter.char, "font-size", randomFloat(1.9, 2.7));
    }
  });
  await sleep(4000);
  pickSize();
}

async function pickShapes() {
  arrayOfLetters().forEach((letter) => {
    if (randomInt(0, 2) === 2) {
      updateLetterWithRandomSetting(letter.char);
    }
  });
  applyUpdates();
  await sleep(4800);
  pickShapes();
}

function setBackgroundTransition(ms) {
  state.misc["background-transition"] = ms;
  document.documentElement.style.setProperty(
    `--background-transition`,
    `${state.misc["background-transition"]}ms`,
  );
}

function updateLetterWithRandomSetting(char) {
  const setting = randomInt(0, settings.length - 1);
  arrayOfLetters().forEach((letter) => {
    if (letter.char === char) {
      // console.log(char);
      // console.log(setting);
      // console.log(settings[setting]);
      Object.entries(settings[setting]).forEach(([x, y]) => {
        const min = parseInt(y.min, 10);
        const max = parseInt(y.max, 10);
        const value = randomInt(min, max);
        setProp(char, x, value);
      });
    }
  });
}

async function xdoRun() {
  await sleep(100);
  setAllOfType("color-transition", 9000);
  setAllOfType("font-transition", 3600);
  setAllOfType("size-transition", 9200);
  applyUpdates();
  await sleep(100);
  pickColors();
  pickShapes();
  pickBackground();
  // pickSizes();
}

async function resizeLetters(count) {
  for (let i = 0; i < count; i++) {
    resizeRandomLetter();
  }
}

async function resizeRandomLetter() {
  const index = randomInt(0, 25);
  const char = arrayOfLetters()[index].char;
  setProp(char, "font-size", randomFloat(1.5, 3));
}

async function pickBackground() {
  document.documentElement.style.setProperty(
    `--background-l`,
    `${randomInt(0, 12)}%`,
  );
  document.documentElement.style.setProperty(
    `--background-c`,
    randomInt(0, 80),
  );
  document.documentElement.style.setProperty(
    `--background-h`,
    randomInt(0, 360),
  );
  await sleep(state.misc["background-transition"] + 400);
  pickBackground();
}

async function pickColors() {
  applyUpdates();
  generateSeed("color-l", 90, 100);
  generateSeed("color-c", 40, 120);
  generateSeed("color-h", 0, 360);
  prepAllFromSeed("color", "large");
  applyUpdates();
  await sleep(9800);
  pickColors();
}

async function xpickShapes() {
  setAllOfType("font-transition", 600);
  pickOne("font-s", 200, 700);
  pickOne("font-t", 300, 900);
  pickOne("font-t2", 400, 800);
  pickOne("font-t2", 400, 800);
  pickOne("font-t2", 400, 800);
  applyUpdates();
  await sleep(1000);
  pickShapes();
}

async function prepSomeFromSeed(type, distance) {
  arrayOfLetters().forEach((letter) => {
    if (randomInt(30, 40) === 20) {
      // console.log(`prepSeomFromSeed: ${letter.char}`);
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
    }
  });
}

//async function shiftLoop() {
//  loopCount += 1;
//  pickOne("font-t");
//  if (loopCount % 5 === 0) {
//    generateSeeds("font", 500, 700);
//    // generateRandomSeeds("font-t");
//    shiftSeed("color-h", "small");
//    prepAllFromSeed("color", "xsmall");
//    //generateSeed("color-c", 70, 180);
//  } else {
//    generateSeeds("font", 100, 200);
//    generateSeed("color-h", 0, 360);
//    prepAllFromSeed("color", "default");
//  }
//  shiftSeed("color-c", "xlarge");
//  prepAllFromSeed("font", "default");
//  applyUpdates();
//  await sleep(5200);
//  shiftLoop();
//}

function setAllFontsToSize(size) {
  arrayOfLetters().forEach((letter) => {
    // console.log(letter.char);
    setProp(letter.char, "font-size", size);
  });
}

function pickOne(type, min, max) {
  const pick = randomInt(0, arrayOfSeeds(type).length - 1);
  arrayOfLetters().forEach((letter) => {
    if (randomInt(0, 1) === 1) {
      arrayOfSeeds(type).forEach((seed, index) => {
        // console.log(letter.char);
        // console.log(seed.prefix);
        if (index === pick) {
          setProp(letter.char, seed.prefix, randomInt(min, max));
        }
      });
    }
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

async function applyUpdates() {
  // This sets transition times first
  // then runs the rest to make sure
  // everything applies with the proper
  // timing. Could stand to dedup the loop
  // but it's fine for now.
  const transitionPrefixes = [
    "color-transition",
    "font-transition",
    "shape-transition",
  ];
  arrayOfLetters().forEach((letter) => {
    seedTypes().forEach((type) => {
      arrayOfSeeds(type).forEach((seed) => {
        if (
          letter.props[seed.prefix].previous_value !==
            getNextPrefixValue(letter.char, seed.prefix)
        ) {
          if (transitionPrefixes.includes(seed.prefix)) {
            const key = `--${seed.prefix}-${letter.char}`;
            const value = `${letter.props[seed.prefix].next_value}${
              propUnit(seed.prefix)
            }`;
            if (letter.char === "a") {
              console.log(`applyUpdates() - ${key} - ${value}`);
            }
            document.documentElement.style.setProperty(
              key,
              value,
            );
            letter.props[seed.prefix].previous_value = getNextPrefixValue(
              letter.char,
              seed.prefix,
            );
          }
        }
      });
    });
  });

  arrayOfLetters().forEach((letter) => {
    seedTypes().forEach((type) => {
      arrayOfSeeds(type).forEach((seed) => {
        if (
          letter.props[seed.prefix].previous_value !==
            getNextPrefixValue(letter.char, seed.prefix)
        ) {
          if (!transitionPrefixes.includes(seed.prefix)) {
            const key = `--${seed.prefix}-${letter.char}`;
            const value = `${letter.props[seed.prefix].next_value}${
              propUnit(seed.prefix)
            }`;
            if (letter.char === "a") {
              console.log(`applyUpdates() - ${key} - ${value}`);
            }
            document.documentElement.style.setProperty(
              key,
              value,
            );
            letter.props[seed.prefix].previous_value = getNextPrefixValue(
              letter.char,
              seed.prefix,
            );
          }
        }
      });
    });
  });

  //
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
      setProp(letter.char, seed.prefix, value);
    });
  });
}

// function matchTransitionSeeds() {
//   state.seeds["font-transition"].previous_value = getNextSeedValue(
//     "font-transition",
//   );
//   state.seeds["font-transition"].next_value = getNextSeedValue(
//     "color-transition",
//   );
// }

function randomFloat(min, max) {
  return (Math.random() * (max - min)) + min;
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

function setAllOfPrefix(prefix, value) {
  arrayOfLetters().forEach((letter) => {
    setProp(letter.char, prefix, value);
  });
}

function setAllOfType(type, value) {
  arrayOfSeeds(type).forEach((seed) => {
    arrayOfLetters().forEach((letter) => {
      setProp(letter.char, seed.prefix, value);
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

function initWithZeros() {
  arrayOfLetters().forEach((letter) => {
    Object.entries(letter.props).forEach(([prefix, details]) => {
      details.next_value = 0;
      const key = `--${prefix}-${letter.char}`;
      const value = `0${propUnit(prefix)}`;

      document.documentElement.style.setProperty(
        key,
        value,
      );
    });
  });
}

function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];

  styles.push(
    ":root { --color-easing: linear; }",
    ":root { --font-easing: linear; }",
    ":root { --size-easing: linear; }",
    `:root {--background-transition: ${
      state.misc["background-transition"]
    }ms; }`,
    ":root {--background-easing: linear; }",
  );

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

function setProp(char, prefix, value) {
  if (char === "a") {
    console.log(`setProp() - ${char} - ${prefix} - ${value}`);
  }
  state.letters[char].props[prefix].previous_value = getNextPrefixValue(
    char,
    prefix,
  );
  state.letters[char].props[prefix].next_value = value;
}
