const { getFrecuency, getRepeatedFrecuency } = require('./day1');

const assert_getFrecuency = function (data, expectedValue) {
    console.log('Testing day 1 puzzle part 1 \nInput: ' + data);

    const result = getFrecuency(data);
    const testPassed = (result === expectedValue);

    console.log('\nOutput: ' + result);

    if (testPassed) {
        console.log('Part 1 test passed\n');
    } else {
        console.log('Expected: ' + expectedValue);
        console.log('Part 1 test failed\n');
    }

    return testPassed;
};

const assert_getRepeatedFrecuency = function (data, expectedValue) {
    console.log('Testing day 1 puzzle part 2 \nInput: ' + data);

    const result = getRepeatedFrecuency(data);
    const testPassed = (result === expectedValue);

    console.log('\nOutput: ' + result);

    if (testPassed) {
        console.log('Part 2 test passed\n');
    } else {
        console.log('Expected: ' + expectedValue);
        console.log('Part 2 test failed\n');
    }

    return testPassed;
};

//test
const data = [[1, -2, 3, 1],
            [1, -1],
            [3, 3, 4, -2, -4],
            [-6, 3, 8, 5, -6],
            [7, 7, -2, -7, -4]];

const expectedOutputP1 = [3, 0, 4, 4, 1];
const expectedOutputP2 = [2, 0, 10, 5, 14];
let passedTestsP1 = 0;
let passedTestsP2 = 0;

data.forEach((element, index) => { if (assert_getFrecuency(element, expectedOutputP1[index])) ++passedTestsP1; });

data.forEach((element, index) => { if (assert_getRepeatedFrecuency(element, expectedOutputP2[index])) ++passedTestsP2; });

if (data.length === passedTestsP1) {
    console.log('All ' + passedTestsP1 + ' Part 1 tests passed');
} else {
    console.log(passedTestsP1 + ' Part 1 tests passed out of ' + data.length);
}

if (data.length === passedTestsP2) {
    console.log('All ' + passedTestsP2 + ' Part 2 tests passed');
} else {
    console.log(passedTestsP2 + ' Part 2 tests passed out of ' + data.length);
}
