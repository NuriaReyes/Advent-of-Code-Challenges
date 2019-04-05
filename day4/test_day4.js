const { processData } = require('./day4');

let assert_processData = function (data, expectedValue) {
    console.log("Testing day 4 puzzle parts 1 and 2 with input: \n\n" + data + "\n");

    let result = processData(data);
    let testP1passed = (result[0] === expectedValue[0]);
    let testP2passed = (result[1] === expectedValue[1]);

    console.log("\nOutput: " + result + "\n");

    if (testP1passed) {
        console.log("Part 1 test passed\n");
    } else {
        console.log("Expected: " + expectedValue);
        console.log("Part 1 test failed\n");
    }

    if (testP2passed) {
        console.log("Part 2 test passed\n");
    } else {
        console.log("Expected: " + expectedValue);
        console.log("Part 2 test failed\n");
    }

    let testsPassed = [testP1passed, testP2passed]

    return testsPassed;
}

let data = '[1518-11-01 00:00] Guard #10 begins shift \
            \n[1518-11-01 00:05] falls asleep \
            \n[1518-11-01 00:25] wakes up \
            \n[1518-11-01 00:30] falls asleep \
            \n[1518-11-01 00:55] wakes up \
            \n[1518-11-01 23:58] Guard #99 begins shift \
            \n[1518-11-02 00:40] falls asleep \
            \n[1518-11-02 00:50] wakes up \
            \n[1518-11-03 00:05] Guard #10 begins shift \
            \n[1518-11-03 00:24] falls asleep \
            \n[1518-11-03 00:29] wakes up \
            \n[1518-11-04 00:02] Guard #99 begins shift \
            \n[1518-11-04 00:36] falls asleep \
            \n[1518-11-04 00:46] wakes up \
            \n[1518-11-05 00:03] Guard #99 begins shift \
            \n[1518-11-05 00:45] falls asleep \
            \n[1518-11-05 00:55] wakes up';

let expectedOutput = [240, 4455];

// Running test
assert_processData(data, expectedOutput);           