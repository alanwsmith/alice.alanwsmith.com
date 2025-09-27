function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];
  styles.push(`:root{
--default-font-size: 1.0rem;
--letter-font-size: 2.7rem;
--color-h-A: 200;
}`);
  styles.push(`.output { 
    font-size: var(--default-font-size);
    color: lch(var(--color-l-Q) var(--color-c-Q) var(--color-h-Q) ); 
    transition-property: color;
    transition-duration: var(--color-transition-Q);
    font-variation-settings: 
      'BLDA' var(--BLDA-Q), 
      'BLDB' var(--BLDB-Q), 
      'SKLA' var(--SKLA-Q), 
      'SKLB' var(--SKLB-Q), 
      'SKLD' var(--SKLD-Q), 
      'TRMA' var(--TRMA-Q), 
      'TRMB' var(--TRMB-Q), 
      'TRMC' var(--TRMC-Q), 
      'TRMD' var(--TRMD-Q), 
      'TRME' var(--TRME-Q), 
      'TRMF' var(--TRMF-Q), 
      'TRMG' var(--TRMG-Q), 
      'TRMK' var(--TRMK-Q), 
      'TRML' var(--TRML-Q);}`);
  chars().forEach((letter) => {
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

// TODO: Deprecate this
function colorProps() {
  const result = {};
  colorSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: "",
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      little_step: parseInt(parts[7]),
      big_step: parseInt(parts[8]),
    };
  });
  return result;
}

// TODO: Deprecate this
function props() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      // TODO: Rename to _step to match
      // color
      little_step: parseInt(parts[7]),
      big_step: parseInt(parts[8]),
    };
  });
  return result;
}

function isLetter(char) {
  let code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function chars() {
  let output = [];
  for (let num = 65; num <= 90; num += 1) {
    output.push(String.fromCharCode(num));
  }
  return output;
}

// TODO: Deprecate this
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomShift(position, min, max, base, direction) {
  // console.log(`${position} ${min} ${max} ${base} ${direction}`);
  // console.log(position);
  const move = randomInt(0, base);
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += direction;
    if (position >= max) {
      direction = -1;
    } else if (position <= min) {
      direction = 1;
    }
  }
  // console.log(position);
  return position;
}

function shiftNumber(position, min, max, move) {
  let step = (move > 0) ? 1 : -1;
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += step;
    if (position >= max) {
      step = -1;
    } else if (position <= min) {
      step = 1;
    }
  }
  return position;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
