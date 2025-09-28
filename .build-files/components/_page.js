export default class {
  async bittyInit() {
    this.spans = null;
    addBaseStyleSheet();
    setAll("color-l", 0);
    setAll("color-c", 0);
    setAll("color-h", 0);
    setAll("color-transition", 0);
    setAll("font-transition", 0);
    generateSeeds("font", 700, 900);
    prepAllFromSeed("font", "default");
    applyUpdates();
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
    setAll("color-transition", 2400);
    setAll("font-transition", 2400);
    applyUpdates();
    await sleep(100);
    generateSeed("color-l", 60, 76);
    generateSeed("color-c", 6, 14);
    generateSeed("color-h", 0, 360);
    generateSeeds("font", 100, 200);
    prepAllFromSeed("color", "xsmall");
    prepAllFromSeed("font", "default");
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
