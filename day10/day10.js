const { readFileSync, writeFileSync } = require('fs'); // Adding file system module

const readInputFile = function (fileName) {
  return readFileSync(fileName, 'utf8').trim();
};

const writeOutputFile = function (fileName, content) {
  // Writing content to file (string format)
  writeFileSync(fileName, content, 'utf8');

  return fileName;
};

const extractPoint = function (element) {
  const indexV = element.indexOf('v');

  const elementPosition = element.slice(0, indexV);
  const inpX = elementPosition.indexOf('<') + 1;
  const endpX = elementPosition.indexOf(',');
  const endpY = elementPosition.indexOf('>');

  const elementVel = element.slice(indexV);
  const invX = elementVel.indexOf('<') + 1;
  const endvX = elementVel.indexOf(',');
  const endvY = elementVel.indexOf('>');

  const point = {
    position: {
      x: Number(elementPosition.slice(inpX, endpX)),
      y: Number(elementPosition.slice(endpX + 1, endpY))
    },
    velocity: {
      x: Number(elementVel.slice(invX, endvX)),
      y: Number(elementVel.slice(endvX + 1, endvY))
    }
  };

  return point;
};

const sortElements = function (data) {
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
    data = data.filter(x => (x.position.y !== yVal));

    subArray.sort(function (a, b) {
      return a.position.x - b.position.x;
    });
    sortedData = sortedData.concat(subArray);
  }

  return sortedData;
};

const getPlaneDimentions = function (data) {
  const dimensions = {
    minY: data[0].position.y,
    maxY: data[data.length - 1].position.y
  };

  const array = data.slice(); // Clone the array

  array.sort(function (a, b) {
    return a.position.x - b.position.x;
  });

  dimensions.minX = array[0].position.x;
  dimensions.maxX = array[array.length - 1].position.x;

  return dimensions;
};

const drawPlane = function (data, dimensions) {
  let pointData = data.slice(); // Duplicating array data
  let yVal = 0;
  let subArray = [];
  const points = '.'.repeat(dimensions.maxX - dimensions.minX + 1);
  const h = dimensions.maxY - dimensions.minY + 1;
  let plane = [];

  // Drawing points plane
  for (let i = 0; i < h; i++) {
    plane.push(points);
  }
    

  while (pointData.length > 0) {
    yVal = pointData[0].position.y;
    subArray = pointData.filter(x => (x.position.y === yVal));
    pointData = pointData.filter(x => (x.position.y !== yVal));

    subArray.forEach(element => {
      const j = element.position.x - dimensions.minX;
      const k = element.position.y - dimensions.minY;

      plane[k] = plane[k].substr(0, j) + '#' + plane[k].substr(j + 1);
    });
  }

  plane = plane.join('\n');

  return plane;
};

const movePoints = function (data) {
  data.forEach(element => {
    element.position.x += element.velocity.x;
    element.position.y += element.velocity.y;
  });

  data = sortElements(data);

  return data;
};

const returnPoints = function (data) {
  data.forEach(element => {
    element.position.x -= element.velocity.x;
    element.position.y -= element.velocity.y;
  });

  data = sortElements(data);

  return data;
};

// Input is sorted data
const adjustPointsToMin = function (data) {
  let dimensions = getPlaneDimentions(data);
  data = movePoints(data);
  let newDimensions = getPlaneDimentions(data);
  let iterations = 0;
  const foundMin = false;

  while (!foundMin) {
    const areaDimensions = (dimensions.maxX - dimensions.minX + 1) * (dimensions.maxY - dimensions.minY + 1);
    const areaNewDimensions = (newDimensions.maxX - newDimensions.minX + 1) * (newDimensions.maxY - newDimensions.minY + 1);

    // Found minimum dimensions and the points are dispersing again
    if (areaDimensions < areaNewDimensions) {
      data = returnPoints(data);
      const plane = drawPlane(data, dimensions);

      console.log(plane);
      console.log('\niterations: ' + iterations);
      console.log('\nWriting to a file...');

      writeOutputFile('output_day10.txt', plane);

      return iterations;

    } else {
      dimensions = newDimensions;
      data = movePoints(data);
      ++iterations;
      newDimensions = getPlaneDimentions(data);
    }
  }
};

const processData = function (data) {
  data = data.split('\n');

  // Converting into array of objects with extracted info
  data = data.map(extractPoint);

  data = sortElements(data);

  const iterations = adjustPointsToMin(data);
 
  return iterations;
};

// Exporting functions 
module.exports = { readInputFile, writeOutputFile, extractPoint, sortElements, getPlaneDimentions, drawPlane, movePoints, processData, adjustPointsToMin, returnPoints };