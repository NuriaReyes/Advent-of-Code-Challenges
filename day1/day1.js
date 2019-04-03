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

// Exporting functions 
module.exports = { readInputFile, getFrecuency, run };