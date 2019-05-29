const { readInputFile, processData } = require('./day3');

let data = '#1 @ 1,3: 4x4 \
            \n#2 @ 3,1: 4x4 \
            \n#3 @ 5,5: 2x2';

if (process.argv.length > 2) { //User added arguments
  
  // Getting user arguments
  const args = process.argv.slice(2); // First two arguments are node and js file
  console.log('Reading file ' + args[0] + '...');
  
  data = readInputFile(args[0]);

} else {

  console.log('No file entered...\n Using default values');
  
}

console.log('\nProcessing data...');
console.log(data);

const result = processData(data);

console.log('\nResult: ');
console.log(result);


