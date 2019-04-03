const { readInputFile, getFrecuency, run } = require('./day1');

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file: " + args[0] + "\n");

    console.log("Frecuency: " + run(args[0]));

} else {
    console.log("No file entered...");
    
    let arr = [-1, 2, 3];

    console.log("Executing default input: " + arr);
    
    console.log("Frecuency: " + run());
}