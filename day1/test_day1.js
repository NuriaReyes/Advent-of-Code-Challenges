const { getFrecuency } = require('./day1');

let assert_getFrecuency = function (data, expectedValue) {
    console.log("Testing input: " + data);

    let result = getFrecuency(data);
    let testPassed = (result === expectedValue);

    console.log("\nOutput: " + result);

    if (testPassed) {
        console.log("Test passed\n");
    } else {
        console.log("Expected: " + expectedValue);
        console.log("Test failed\n");
    }

    return testPassed;
}

//test
let data = [[1, 2, 3],
[3, 2, 1, 0, -1, -2, -3],
[5, 5, 7, 17, 3, -10, 11, 19]];

let expectedOutput = [6, 0, 57];
let passedTests = 0;

data.forEach((element, index) => { if (assert_getFrecuency(element, expectedOutput[index])) ++passedTests });

if (data.length === passedTests) {
    console.log("All tests passed");
} else {
    console.log(passedTests + " tests passed out of " + data.length);
}
