let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module

    // Getting raw content (string format)
    let content = fs.readFileSync(fileName, 'utf8');

    return content;
}

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file " + args[0] + "...\n");

    let content = readInputFile(args[0]);

    console.log("Processing input..." + "\n");

    console.log(content);

} else {

    let defaultPoints = 'position=< 9,  1> velocity=< 0,  2> \
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
                        \nposition=<-3,  6> velocity=< 2, -1>' ;

    console.log("No file entered...");
    console.log("Default raw data:");
    console.log(defaultPoints);

}