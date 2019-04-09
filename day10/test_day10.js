const { readInputFile, processData } = require('./day10');

const assert_processData = function (data, expectedValueP1, expectedValueP2) {
  console.log('Testing day 10 puzzle parts 1 and 2');

  console.log('\nOutput:\n');
  const result2 = processData(data);

  const result = readInputFile('output_day10.txt');

  const testP1passed = (result === expectedValueP1);
  const testP2passed = (result2 === expectedValueP2);

  if (testP1passed) {
    console.log('\nPart 1 test passed\n');
  } else {
    console.log('\nExpected: ');
    console.log(expectedValueP1);
    console.log('Part 1 test failed\n');
  }

  if (testP2passed) {
    console.log('Part 2 test passed\n');
  } else {
    console.log('Expected: ' + expectedValueP2);
    console.log('Part 2 test failed\n');
  }

  const testsPassed = [testP1passed, testP2passed];

  return testsPassed;
};

const data = 'position=< 9,  1> velocity=< 0,  2> \
            \nposition=< 7,  0> velocity=<-1,  0> \
            \nposition=< 3, -2> velocity=<-1,  1> \
            \nposition=< 6, 10> velocity=<-2, -1> \
            \nposition=< 2, -4> velocity=< 2,  2> \
            \nposition=<-6, 10> velocity=< 2, -2> \
            \nposition=< 1,  8> velocity=< 1, -1> \
            \nposition=< 1,  7> velocity=< 1,  0> \
            \nposition=<-3, 11> velocity=< 1, -2> \
            \nposition=< 7,  6> velocity=<-1, -1> \
            \nposition=<-2,  3> velocity=< 1,  0> \
            \nposition=<-4,  3> velocity=< 2,  0> \
            \nposition=<10, -3> velocity=<-1,  1> \
            \nposition=< 5, 11> velocity=< 1, -2> \
            \nposition=< 4,  7> velocity=< 0, -1> \
            \nposition=< 8, -2> velocity=< 0,  1> \
            \nposition=<15,  0> velocity=<-2,  0> \
            \nposition=< 1,  6> velocity=< 1,  0> \
            \nposition=< 8,  9> velocity=< 0, -1> \
            \nposition=< 3,  3> velocity=<-1,  1> \
            \nposition=< 0,  5> velocity=< 0, -1> \
            \nposition=<-2,  2> velocity=< 2,  0> \
            \nposition=< 5, -2> velocity=< 1,  2> \
            \nposition=< 1,  4> velocity=< 2,  1> \
            \nposition=<-2,  7> velocity=< 2, -2> \
            \nposition=< 3,  6> velocity=<-1, -1> \
            \nposition=< 5,  0> velocity=< 1,  0> \
            \nposition=<-6,  0> velocity=< 2,  0> \
            \nposition=< 5,  9> velocity=< 1, -2> \
            \nposition=<14,  7> velocity=<-2,  0> \
            \nposition=<-3,  6> velocity=< 2, -1>';

const expValP1 =
'#...#..###\
\n#...#...#.\
\n#...#...#.\
\n#####...#.\
\n#...#...#.\
\n#...#...#.\
\n#...#...#.\
\n#...#..###';

const expValP2 = 3;

// Running test
assert_processData(data, expValP1, expValP2);