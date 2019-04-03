const { getFrecuency } = require('./day1');

let test_getFrecuency = function (data, expectedValue) {
    return (getFrecuency(data) === expectedValue);
}

//test
let d1 = [1, 2, 3];
console.log("Testing input: " + d1);
if (test_getFrecuency(d1, 6)) {
    console.log("Test passed");
} else {
    console.log("Test failed");
}