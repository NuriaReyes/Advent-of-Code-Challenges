const readInputFile = function (fileName) {
  const { readFileSync } = require('fs');

  return readFileSync(fileName, 'utf8').trim().split('\n');
};

const countRepeatedLetters = function (string, timesRepeated) {
  const ids = Array.from(string);

  for (let i = 0; i < ids.length; i++) {
    const letter = ids[i];
    let counter = ids.filter(x => x === letter).length;

    if (counter === timesRepeated) return true;

    counter = 1;
  }

  return false;
};

const findSimilarID = function (array) {
  for (let i = 0; i < array.length; i++) {

    let counter = 0;
    let diff;
    for (let j = i + 1; j < array.length; j++) {

      for (let k = 0; k < array[i].length; k++) {
        if (array[i][k] !== array[j][k]) {
          ++counter;
          diff = k;
        }
        //console.log(counter);
        
        if (counter > 1) break;
      }

      //console.log('String1: ' + array[i] + ' String2: ' + array[j]);
      if ( counter === 1) {
        console.log('String1: ' + array[i] + ' String2: ' + array[j]);
        console.log('------------Found it-------');
        
        return array[i].slice(0,diff) + array[i].slice(diff+1);
      }

      counter = 0;

    }

  }
};

const processData = function (data, part = 1) {
  if (part === 1) {
    const letterTwice = data.filter(x => countRepeatedLetters(x, 2)).length;
    const letterThreeTimes = data.filter(x => countRepeatedLetters(x, 3)).length;

    console.log('IDs with exactly 2 letters: ' + letterTwice + '\nIDs with exactly 3 letters: ' + letterThreeTimes + '\n');

    return letterTwice * letterThreeTimes;
  } else {
    //find similar IDs
    return findSimilarID(data);
  }

};

module.exports = { readInputFile, countRepeatedLetters, findSimilarID, processData };