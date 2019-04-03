let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module
    
    return fs.readFileSync(fileName, 'utf8').split('\n').map(x => Number(x));
}

let getFrecuency = function (array) {
    return array.reduce((acc, x) => acc += x);
}

let run = function (fileName = false) {
    if (fileName) {
        let content = readInputFile(fileName);
        return getFrecuency(content);
    } else {
        let arr = [-1, 2, 3];
        return getFrecuency(arr);
    }
}

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

// Exporting functions 
module.exports = { readInputFile, getFrecuency, run };


