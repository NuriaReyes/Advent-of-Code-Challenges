let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module

    // Getting raw content (string format)
    let content = fs.readFileSync(fileName, 'utf8');

    return content;
}

let extractPoint = function (element) {
    let indexV = element.indexOf('v');

    let elementPosition = element.slice(0, indexV);
    let inpX = elementPosition.indexOf('<') + 1;
    let endpX = elementPosition.indexOf(',');
    let endpY = elementPosition.indexOf('>');

    let elementVel = element.slice(indexV);
    let invX = elementVel.indexOf('<') + 1;
    let endvX = elementVel.indexOf(',');
    let endvY = elementVel.indexOf('>');

    let point = {
        position: {
            x: Number(elementPosition.slice(inpX, endpX)),
            y: Number(elementPosition.slice(endpX + 1, endpY))
        },
        velocity: {
            x: Number(elementVel.slice(invX, endvX)),
            y: Number(elementVel.slice(endvX + 1, endvY))
        }
    }

    return point;
}

let sortElements = function (data) {
    data = data.split('\n');

    // Converting into array of objects with extracted info
    data = data.map(extractPoint);

    data.sort(function (a, b) {
        return a.position.y - b.position.y;
    });

    return data;
}

let getPlaneDimentions = function (data) {

}

let drawPlane = function (data, dimensions, seconds) {

}

let processData = function (data, seconds) {

    data = sortElements(data);

    let dimensions = getPlaneDimentions(data)

    let plane = drawPlane(data, dimensions, seconds);

    return data;
}

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file " + args[0] + "...\n");

    let content = readInputFile(args[0]);

    let plane = processData(content, 1);

    console.log("Processing input..." + "\n");

    console.log(plane);

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

    let plane = processData(defaultPoints, 3);

    console.log("\nDrawing default points..." + "\n");

    console.log(plane);

}