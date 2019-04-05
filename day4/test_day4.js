const { getElementInfo, sortElements, getMaxAsleepTime, processData } = require('./day4');

let test_processData = function (data, expectedValue) {
    return (day4.processData() === expectedValue);
}

let assert_getFrecuency = function (data, expectedValue) {
    console.log("Testing input: " + data);

    let result = getFrecuency(data);
    let testPassed = (result === expectedValue);

    console.log("\nOutput: " + result);

    if (testPassed) {
        console.log("Part 1 test passed\n");
    } else {
        console.log("Expected: " + expectedValue);
        console.log("Part 1 test failed\n");
    }

    return testPassed;
}