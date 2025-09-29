const s = {
  currentProps: {},
  background: {
    loop: 0,
  },
  color: {
    loop: 0,
    lMin: 80,
    lMax: 100,
    cMin: 10,
    cMax: 24,
    hMin: 0,
    hMax: 360,
  },
  font: {
    loop: 0,
  },
};

export default class {
  async bittyInit() {
    initVars();
    addBaseStyleSheet();
  }

  loadInput(_event, el) {
    const spanMaker = new SpanMaker(el.innerText);
    this.spans = spanMaker.makeParagraphs().makeWords().makeSpans().output();
    this.api.forward(null, "inputPayload");
  }

  inputPayload(_event, el) {
    el.innerHTML = this.spans;
  }

  async startUpdaters(_event, _el) {
    updateBackground();
    updateColors();
    updateFonts();
  }
}

async function updateBackground() {
  setProp(`--background-l`, `${randomInt(7, 10)}%`);
  setProp(`--background-c`, randomInt(12, 40));
  setProp(`--background-h`, randomInt(0, 360));
  await sleep(20000);
  s.background.loop += 1;
  updateBackground();
}

async function updateFonts() {
  setProp(`--font-transition`, `6000ms`);
  if (s.font.loop === 0) {
    setFontTo(0);
  } else {
    setFontTo(randomInt(0, listOfVars().length - 1));
  }
  await sleep(6700);
  s.font.loop += 1;
  updateFonts();
}

async function updateColors() {
  if (s.color.loop <= 3) {
    setProp(`--color-transition`, `4000ms`);
    s.color.cMin = 10 + (s.color.loop * 5);
    s.color.cMax = 14 + (20 * s.color.loop);
  } else {
    s.color.cMin = 0;
    s.color.cMax = 140;
  }
  const chroma = randomInt(s.color.cMin, s.color.cMax);
  for (let char of listOfLetters()) {
    // gotta sleep otherwise chrome batches
    // the updates in oneshot
    await sleep(10);
    const lKey = `--color-l-${char}`;
    const lValue = `${randomInt(86, 96)}%`;
    setProp(lKey, lValue);
    const cKey = `--color-c-${char}`;
    const cValue = chroma;
    setProp(cKey, cValue);
    const hKey = `--color-h-${char}`;
    const hValue = randomInt(0, 360);
    setProp(hKey, hValue);
  }
  await sleep(5200);
  s.color.loop += 1;
  updateColors();
}

async function setFontTo(fontIndex) {
  for (let v of listOfVars()) {
    const key = `--${v}`;
    const value = settings[fontIndex][v]["min"];
    setProp(key, value);
  }
}

function addBaseStyleSheet() {
  const css = new CSSStyleSheet();
  let styles = [];
  const variations = listOfVars().map((variation) => {
    const varString = `"${variation}" var(--${variation})`;
    return varString;
  });
  styles.push(`.letter, .letter-alt {`);
  styles.push(`transition:`);
  styles.push(`color var(--color-transition)`);
  styles.push(`,`);
  styles.push(
    `font-variation-settings var(--font-transition)`,
  );
  styles.push(`;`);
  styles.push(`font-variation-settings: `);
  styles.push(variations.join(","));
  styles.push(";");
  styles.push("} ");
  for (let char of listOfLetters()) {
    styles.push(`.letter-${char} {`);
    styles.push(`font-size: var(--font-size-${char});`);
    styles.push(
      `color: lch(var(--color-l-${char}) var(--color-c-${char}) var(--color-h-${char}) );`,
    );
    styles.push("}");
  }
  const output = styles.join("\n");
  css.replaceSync(output);
  document.adoptedStyleSheets.push(css);
}

async function setProp(key, value) {
  if (s.currentProps[key] !== value) {
    document.documentElement.style.setProperty(
      key,
      value,
    );
  }
}

async function initVars() {
  setProp(
    `--background-transition`,
    `17000ms`,
  );
  setProp(`--color-easing`, `linear`);
  setProp(`--background-easing`, `linear`);
  setProp(`--color-transition`, `6000ms`);
  setProp(`--font-transition`, `5000ms`);
  for (let v of listOfVars()) {
    setProp(`--${v}`, 0);
  }

  for (let char of listOfLetters()) {
    setProp(`--font-size-${char}`, `${randomFloat(1.7, 2.9)}rem`);
    setProp(`--color-l-${char}`, `0%`);
    setProp(`--color-c-${char}`, 0);
    setProp(`--color-h-${char}`, 0);
  }
}

function listOfLetters() {
  const letters = [...Array(26)].map((_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );
  shuffleArray(letters);
  return letters;
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function listOfVars() {
  return Object.keys(settings[0]);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return (Math.random() * (max - min)) + min;
}
