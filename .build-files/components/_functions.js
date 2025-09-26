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
