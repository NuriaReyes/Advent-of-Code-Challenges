const { readInputFile, processData } = require('./day2');

let data;
let data2;
if (process.argv.length > 2) {

  const fileName = process.argv[2];
  console.log('Reading file...');
  data = readInputFile(fileName);
  data2 = readInputFile(fileName);
  console.log('\nExtracting data from file...');

} else {

  data = ['abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab'];

  data2 = ['abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'];

  console.log('No file entered, executing using default data...');
  console.log('\nDefault data - p1: ');
  console.log(data);
  console.log('\nDefault data - p2: ');
  console.log(data2);
}

console.log('Total strings to analize - p1: ' + data.length + '\n');

const result = processData(data);
console.log('P1 - Result: ' + result);

console.log('\nTotal strings to analize - p2: ' + data2.length + '\n');
const result2 = processData(data2, 2);
console.log('P2 - Result: ' + result2);