const readInputFile = function (fileName) {
  const { readFileSync } = require('fs');

  return readFileSync(fileName, 'utf8');
};

const getElement = function (element) {
  const id = element.slice(1, element.indexOf('@') - 1);
  const x = Number(element.slice(element.indexOf('@') + 1, element.indexOf(',')));
  const y = Number(element.slice(element.indexOf(',') + 1, element.indexOf(':')));
  const width = Number(element.slice(element.indexOf(':') + 1, element.indexOf('x')));
  const height = Number(element.slice(element.indexOf('x') + 1));
  
  const x_expanded = [];
  const y_expanded = [];

  for (let i = x, j = y; i <= (width + x - 1) || j <= (height + y - 1); i++, j++) {
    if (i <= (width + x - 1)) x_expanded.push(i);
    if (j <= (height + y - 1)) y_expanded.push(j);
  }

  const claim = {
    id: id,
    x: x,
    x_expanded: x_expanded,
    y: y,
    y_expanded: y_expanded,
    width: width,
    height: height
  };

  return claim;
};

const sortElements = function (data) {
  data = data.trim().split('\n').map(getElement);

  // Sort by Y
  data.sort((a, b) => {
    return a.y - b.y;
  });

  // Sort by X
  let sortedData = [];
  let yVal = 0;
  let subArray = [];

  while (data.length > 0) {
    yVal = data[0].y;
    subArray = data.filter(x => (x.y === yVal));
    data = data.filter(x => (x.y !== yVal));

    subArray.sort(function (a, b) {
      return a.x - b.x;
    });

    sortedData = sortedData.concat(subArray);
  }

  return sortedData;
};

const findRepeatedClaims = function (data) {
  let inchesCount = 0;

  for (let i = 0; i < data.length; i++) {
    const lastY = data[i].height + data[i].y - 1;
    const lastX = data[i].width + data[i].x - 1;

    for (let j = i + 1; j < data.length; j++) {
      let yRepeated = [];
      let xRepeated = [];

      if ( ( lastY >= data[j].y ) && ( lastX >= data[j].x ) ) {
        yRepeated = data[j].y_expanded.filter(y => (y >= data[i].y && y <= lastY));
        xRepeated = data[j].x_expanded.filter(x => (x >= data[i].x && x <= lastX));
      }

      console.log(yRepeated);
      console.log(xRepeated);

    }
  }

  return inchesCount;
};

const processData = function (data) {
  data = sortElements(data);
  const result = findRepeatedClaims(data);

  return result;
};

module.exports = { readInputFile, getElement, sortElements, findRepeatedClaims, processData };