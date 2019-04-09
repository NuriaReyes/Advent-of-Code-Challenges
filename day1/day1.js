const readInputFile = function (fileName) {
  const { readFileSync } = require('fs'); // Adding file system module

  return readFileSync(fileName, 'utf8').trim().split('\n').map(x => Number(x));
};

const getFrecuency = function (array) {
  return array.reduce((acc, x) => acc += x);
};

const getRepeatedFrecuency = function (array) {
  const frecuencies = [0];
  const notFound = true;
  let currentFrec = 0;
  let i = 0;

  while (notFound) {
    currentFrec += array[i];

    for (let x = 0; x < frecuencies.length; x++) {
      if (currentFrec === frecuencies[x]) {
        return currentFrec;
      }
    }

    frecuencies.push(currentFrec);

    if (i < (array.length - 1)) {
      ++i;
    } else {
      i = 0;
    }
  }
};

const run = function (part, fileName = false) {
  let content = [1, -2, 3, 1];

  if (fileName) {
    content = readInputFile(fileName);
  }

  if (part === 1) {
    return getFrecuency(content);
  } // Part 2
  return getRepeatedFrecuency(content);
};

// Exporting functions
module.exports = { readInputFile, getFrecuency, getRepeatedFrecuency, run };
