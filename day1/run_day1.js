const { run } = require('./day1');

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    const args = process.argv.slice(2); // first 2 elements being node and js file
    console.log('Reading file: ' + args[0] + '\n');

    console.log('Frecuency: ' + run(1, args[0]));
    console.log('First repeated frecuency: ' + run(2, args[0]));
} else {
    console.log('No file entered...');
    
    const arr = [1, -2, 3, 1];

    console.log('Executing default input: ' + arr);
    
    console.log('Frecuency: ' + run(1));
    console.log('First repeated frecuency: ' + run(2));
}