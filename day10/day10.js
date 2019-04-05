const { readFileSync, writeFileSync } = require('fs'); // Adding file system module

let readInputFile = function (fileName) {
    return readFileSync(fileName, 'utf8').trim();
}

let writeOutputFile = function (fileName, content) {
    // Writing content to file (string format)
    writeFileSync(fileName, content, 'utf8');

    return fileName;
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

            plane[k] = plane[k].substr(0, j) + '#' + plane[k].substr(j + 1);
        });
    }

    plane = plane.join('\n');

    return plane;
}

let movePoints = function (data) {
    data.forEach(element => {
        element.position.x += element.velocity.x;
        element.position.y += element.velocity.y;
    });

    data = sortElements(data);

    return data;
}

let returnPoints = function (data) {
    data.forEach(element => {
        element.position.x -= element.velocity.x;
        element.position.y -= element.velocity.y;
    });

    data = sortElements(data);

    return data;
}

// Input is sorted data
let adjustPointsToMin = function (data) {
    let dimensions = getPlaneDimentions(data);
    data = movePoints(data);
    let newDimensions = getPlaneDimentions(data);
    let iterations = 0;
    let foundMin = false;

    while (!foundMin) {
        let areaDimensions = (dimensions.maxX - dimensions.minX + 1) * (dimensions.maxY - dimensions.minY + 1);
        let areaNewDimensions = (newDimensions.maxX - newDimensions.minX + 1) * (newDimensions.maxY - newDimensions.minY + 1);

        // Found minimum dimensions and the points are dispersing again
        if (areaDimensions < areaNewDimensions) {
            data = returnPoints(data);
            let plane = drawPlane(data, dimensions);

            console.log(plane);
            console.log("\niterations: " + iterations);
            console.log("\nWriting to a file...");

            writeOutputFile("output_day10.txt", plane);

            return iterations;

        } else {
            dimensions = newDimensions;
            data = movePoints(data);
            ++iterations;
            newDimensions = getPlaneDimentions(data);
        }
    }
}

let processData = function (data) {
    data = data.split('\n');

    // Converting into array of objects with extracted info
    data = data.map(extractPoint);

    data = sortElements(data);

    let iterations = adjustPointsToMin(data);
 
    return iterations;
}

// Exporting functions 
module.exports = { readInputFile, writeOutputFile, extractPoint, sortElements, getPlaneDimentions, drawPlane, movePoints, processData, adjustPointsToMin, returnPoints };