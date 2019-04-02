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
    // data = data.split('\n');

    // // Converting into array of objects with extracted info
    // data = data.map(extractPoint);

    // Sort by position in Y
    data.sort(function (a, b) {
        return a.position.y - b.position.y;
    });

    // Sort by position in X
    let sortedData = [];
    let yVal = 0;
    let subArray = [];
    while (data.length > 0) {
        yVal = data[0].position.y;
        subArray = data.filter(x => (x.position.y === yVal));
        data = data.filter(x => (x.position.y !== yVal))

        subArray.sort(function (a, b) {
            return a.position.x - b.position.x;
        });
        sortedData = sortedData.concat(subArray);
    }

    return sortedData;
}

let getPlaneDimentions = function (data) {
    let dimensions = {
        minY: data[0].position.y,
        maxY: data[data.length - 1].position.y
    }

    let array = data.slice(); // Clone the array

    array.sort(function (a, b) {
        return a.position.x - b.position.x;
    });

    dimensions.minX = array[0].position.x;
    dimensions.maxX = array[array.length - 1].position.x;

    return dimensions;
}

let drawPlane = function (data, dimensions) {
    let pointData = data.slice(); // Duplicating array data
    let yVal = 0;
    let subArray = [];
    let points = '.'.repeat(dimensions.maxX - dimensions.minX + 1);
    let h = dimensions.maxY - dimensions.minY + 1;
    let plane = [];

    // Drawing points plane
    for (let i = 0; i < h; i++) {
        plane.push(points);
    }

    while (pointData.length > 0) {
        yVal = pointData[0].position.y;
        subArray = pointData.filter(x => (x.position.y === yVal));
        pointData = pointData.filter(x => (x.position.y !== yVal))

        subArray.forEach(element => {
            let j = element.position.x - dimensions.minX;
            let k = element.position.y - dimensions.minY;
            //console.log("px: " + element.position.x + ", index" + j);

            plane[k] = plane[k].substr(0, j) + '#' + plane[k].substr(j + 1);
        });
    }

    plane = plane.join('\n');
    console.log(plane);

    return plane;
}

let movePoints = function (data) {
    
    data = sortElements(data);

    data.forEach (element => {
        element.position.x += element.velocity.x;
        element.position.y += element.velocity.y;
    });
    
    data = sortElements(data);

    return data;
}

let processData = function (data, seconds) {
    data = data.split('\n');

    // Converting into array of objects with extracted info
    data = data.map(extractPoint);

    data = sortElements(data);

    let dimensions = getPlaneDimentions(data)

    let plane ;
    for (let i = 0; i <= seconds; ++i) {
        console.log("\n" + i + "s...\n");
        plane = drawPlane(data, dimensions);
        data = movePoints(data);
    }

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
    // console.log("Default raw data:");
    // console.log(defaultPoints);


    console.log("\nDrawing default points...");

    let plane = processData(defaultPoints, 3);

    //console.log(plane);

}