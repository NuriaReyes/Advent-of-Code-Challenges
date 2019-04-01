let getFrecuency = function (array) {

    const reducer = function (acc, x) {
        return acc += x;
    }

    let frecuency = array.reduce(reducer);
    return frecuency;
}

let getFrecuencyInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module
    
    let reader = function (error, content) {
        if (error) throw error;
        content = content.split('\n').map(x => Number(x));
        console.log(content);

        console.log("Frecuency: " + getFrecuency(content));
    }

    fs.readFile(fileName, 'utf8', reader);
}

let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module

    // Getting raw content (string format)
    let content = fs.readFileSync(fileName, 'utf8');
    
    content = content.split('\n').map(x => Number(x));
    
    return content;
}

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file " + args[0] + "...\n");

    let content = readInputFile(args[0]);
    
    console.log(content);
    console.log("Frecuency: " + getFrecuency(content));

} else {
    console.log("No file entered...");
    
    let arr = [-1, 2, 3];

    console.log("Executing default input: " + arr);
    
    console.log(getFrecuency(arr));
}




