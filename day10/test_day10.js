const day10 = require('./day10');

let test_processData = function (data, seconds, expectedValue) {
    return (day10.processData() === expectedValue);
}