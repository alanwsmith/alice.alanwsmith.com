function addBaseStyleSheet() {
  const stylesSheet = new CSSStyleSheet();
  let styles = [];
  // cover everything that's not a letter
  styles.push(
    `.output { 
          transition-property: color;
          transition-duration: 4s;
            color: lch(var(--color-l-Q) var(--color-c-Q) var(--color-h-Q) ); 
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
              'TRML' var(--TRML-Q);
        }`,
  );
  letters().forEach((letter) => {
    styles.push(
      `.letter-${letter} { 
          transition-property: color;
          transition-duration: 4s;
/*
            transform: rotate(var(--rotate-${letter}));
            font-size: var(--font-size-${letter});
*/
            font-size: 2.7rem;
            padding-inline: 0.11rem;
            color: lch(var(--color-l-${letter}) var(--color-c-${letter}) var(--color-h-${letter}) ); 
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
              'TRML' var(--TRML-${letter});
        }`,
    );
  });
  stylesSheet.replaceSync(styles.join("\n"));
  document.adoptedStyleSheets.push(stylesSheet);
}

function colorProps() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      small_jump: parseInt(parts[7]),
      large_jump: parseInt(parts[8]),
    };
  });
  return result;
}

function props() {
  const result = {};
  styleSet.forEach((slider) => {
    const parts = slider.split("|");
    result[parts[5]] = {
      default: parseFloat(parts[1]),
      min: parseFloat(parts[2]),
      max: parseFloat(parts[3]),
      unit: parts[6],
      small_jump: parseInt(parts[7]),
      large_jump: parseInt(parts[8]),
    };
  });
  return result;
}

function isLetter(char) {
  let code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function letters() {
  let output = [];
  for (let num = 65; num <= 90; num += 1) {
    output.push(String.fromCharCode(num));
  }
  return output;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shiftNumber(position, min, max, move) {
  let step = (move > 0) ? 1 : -1;
  for (let count = 0; count < Math.abs(move); count += 1) {
    position += step;
    if (position === max) {
      step = -1;
    } else if (position === min) {
      step = 1;
    }
  }
  return position;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
