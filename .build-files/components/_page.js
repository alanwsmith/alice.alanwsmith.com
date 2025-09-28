let loopCount = 0;

export default class {
  async bittyInit() {
    addBaseStyleSheet();
    pickOne("font-t");
    setAll("color-l", 0);
    setAll("color-c", 0);
    setAll("color-h", 0);
    setAll("color-transition", 0);
    setAll("font-transition", 0);
    generateSeeds("font", 700, 900);
    prepAllFromSeed("font", "default");
    applyUpdates();
  }

  loadInput(_event, el) {
    const spanMaker = new SpanMaker(el.innerText);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
    el.innerHTML = this.spans;
  }

  async startUpdates(_event, el) {
    //console.log(state.letters["a"]);
    await sleep(100);
    setAll("color-transition", 1600);
    setAll("font-transition", 3000);
    applyUpdates();
    await sleep(100);
    pickOne("font-t");
    generateSeed("color-l", 74, 86);
    generateSeed("color-c", 10, 18);
    generateSeed("color-h", 0, 360);
    generateSeeds("font", 100, 300);
    prepAllFromSeed("color", "small");
    prepAllFromSeed("font", "default");
    applyUpdates();
    await sleep(5200);
    shiftLoop();
  }
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

function pickOne(type) {
  const pick = randomInt(0, arrayOfSeeds(type).length - 1);
  arrayOfLetters().forEach((letter) => {
    arrayOfSeeds(type).forEach((seed, index) => {
      // console.log(letter.char);
      // console.log(seed.prefix);
      if (index === pick) {
        setProp(letter.char, seed.prefix, randomInt(400, 1000));
      } else {
        setProp(letter.char, seed.prefix, 0);
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
          letter.props[seed.prefix].previous_value !=
            letter.props[seed.prefix].next_value
        ) {
          const key = `--${seed.prefix}-${letter.char}`;
          const value = `${letter.props[seed.prefix].next_value}${
            propUnit(seed.prefix)
          }`;
          //console.log(`${key} - ${value}`);
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

function generateRandomSeed(prefix, min, max) {
  // setSeed(prefix));
}

function generateRandomSeeds(type, min, max) {
  arrayOfSeeds(type).forEach((seed) => {
    generateRandomSeed(seed.prefix, min, max);
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

function fontVariations(char) {
  const prefixes = [];
  arrayOfSeeds("font").forEach((seed) => {
    prefixes.push(seed.prefix);
  });
  arrayOfSeeds("font-t").forEach((seed) => {
    prefixes.push(seed.prefix);
  });
  console.log(prefixes);
}

function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];
  fontVariations();

  styles.push(`.output { 
    font-size: var(--letter-font-size);
    color: lch(var(--color-l-q) var(--color-c-q) var(--color-h-q) ); 
    transition: 
      color var(--color-transition-q) linear,
      font-variation-settings var(--font-transition-q) linear;
    font-variation-settings: 
      'BLDA' var(--BLDA-q), 
      'BLDB' var(--BLDB-q), 
      'SKLA' var(--SKLA-q), 
      'SKLB' var(--SKLB-q), 
      'SKLD' var(--SKLD-q), 
      'TRMC' var(--TRMC-q), 
      'TRME' var(--TRME-q), 
      'TRMG' var(--TRMG-q), 
      'TRML' var(--TRML-q)

;}`);

  arrayOfLetters().forEach((details) => {
    const letter = details.char;
    styles.push(`.letter-${letter} {
        font-size: var(--letter-font-size);
        color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) );
        transition: 
          color var(--color-transition-${letter}) linear,
          font-variation-settings var(--font-transition-${letter}) linear;
        font-variation-settings:
          'BLDA' var(--BLDA-${letter}),
          'BLDB' var(--BLDB-${letter}),
          'SKLA' var(--SKLA-${letter}),
          'SKLB' var(--SKLB-${letter}),
          'SKLD' var(--SKLD-${letter}),
          'TRMC' var(--TRMC-${letter}),
          'TRME' var(--TRME-${letter}),
          'TRMG' var(--TRMG-${letter}),
          'TRML' var(--TRML-${letter})

;}`);
  });

  stylesSheet.replaceSync(styles.join("\n"));
  document.adoptedStyleSheets.push(stylesSheet);
}
