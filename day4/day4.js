const readInputFile = function (fileName) {
  const { readFileSync } = require('fs'); // Adding file system module

  return readFileSync(fileName, 'utf8').trim();
};

// element is an input's raw row
const getElementInfo = function (element) {
  const i = element.indexOf('-') + 1; // getting date
  const j = element.indexOf(':') + 1; // getting minute
  const k = element.indexOf('#'); // getting guard ID (if exists)
  const asleep = element.indexOf('asleep'); // is guard falling asleep?
  const awake = element.indexOf('wakes'); // is guard waking up?

  const elementInfo = {
    time: {
      hour: Number(element.slice(j - 3, j - 1)),
      minute: Number(element.slice(j, j + 2))
    }
  };

  elementInfo.dateTimeNum = (Number(element.slice(i, i + 2)) * 70000) + //getting month
        (Number(element.slice(i + 3, i + 5)) * 2000) + //getting day
        (elementInfo.time.hour * 70) +
        (elementInfo.time.minute);

  if (k === -1) { // sleep/awake guard info
    elementInfo.hasGuardID = false; // No guard ID
    if (asleep !== -1)
      elementInfo.isAsleep = true; //guard asleep
    else if (awake !== -1)
      elementInfo.isAsleep = false; //guard awake
  } else {
    elementInfo.hasGuardID = true; // Next element is guard ID

    const endID = element.slice(k).indexOf(' ');

    elementInfo.guardID = element.slice(k, k + endID); // guard ID
  }

  // elementInfo = { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? } <-- format
  return elementInfo;
};

// data is a string with all the raw input
const sortElements = function (data) {
  data = data.split('\n');

  // Converting into array of objects with extracted info
  data = data.map(getElementInfo);

  // Sort entries
  data.sort(function (a, b) {
    return a.dateTimeNum - b.dateTimeNum;
  });

  // Adding ids to all records
  let ID = 0;
  data.forEach(element => {
    if (element.hasGuardID) {
      ID = element.guardID;
    } else {
      element.guardID = ID;
    }
  });

  return data;
};

// data is an array of objects with format: { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
const getCommonAsleepMinute = function (data) {

  // Getting unique Ids
  const ID = data.map(x => x.guardID).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  let sleepIntervals = [];
  let init = 0;
  const asleepGuard = {};

  ID.forEach((id, index) => {
    // Getting rows with id
    const idData = data.filter(e => (e.guardID === id) && !e.hasGuardID);

    // Getting all minutes the guard was asleep
    idData.forEach(e => {
      if (e.isAsleep) {
        init = e.time.minute;
      } else {
        for (let i = init; i <= (e.time.minute - 1); i++) {
          sleepIntervals.push(i);
        }
      }
    });

    // Getting most common minutes for each guard
    const minuteCounts = {};
    const max = {};
    let ref = 0;
    sleepIntervals.forEach(function (min) {
      // Object with a list of each minute and how many times is repeated
      minuteCounts[min] = (minuteCounts[min] || 0) + 1;

      if (minuteCounts[min] > ref) {
        max.repeated = minuteCounts[min];
        ref = minuteCounts[min];
        max.minute = min;
      }
    });

    // Getting guard asleep the most
    if (index === 0) {
      asleepGuard.id = id;
      asleepGuard.repeated = max.repeated;
      asleepGuard.minute = max.minute;
    } else if (max.repeated > asleepGuard.repeated) {
      asleepGuard.id = ID[index];
      asleepGuard.repeated = max.repeated;
      asleepGuard.minute = max.minute;
    }

    sleepIntervals = [];
  });

  return asleepGuard;
};

// data is an array of objects with format: { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
const getMaxAsleepTime = function (data) {

  // Getting unique Ids
  const ID = data.map(x => x.guardID).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  let initTime = 0;
  let totalT = 0;
  const maxGuard = {};

  // Getting total times for each guard ID
  ID.forEach((id, index) => {
    // Getting rows with id
    const idData = data.filter(e => (e.guardID === id) && !e.hasGuardID);

    // Getting all minutes the guard was asleep
    idData.forEach(e => {
      if (e.isAsleep) {
        initTime = e.time.minute;
      } else {
        totalT += e.time.minute - initTime;
        initTime = 0;
      }
    });

    if (index === 0) {
      maxGuard.id = id;
      maxGuard.totalTime = totalT;
    } else if (totalT > maxGuard.totalTime) {
      maxGuard.id = id;
      maxGuard.totalTime = totalT;
    }

    totalT = 0;
  });

  // Constructing object with guard's info
  maxGuard.times = [];
  let asleepTime = {};
  const minsData = data.filter(e => (e.guardID === maxGuard.id) && !e.hasGuardID);

  minsData.forEach(element => {

    if (element.isAsleep) {
      asleepTime.begin = element.time.minute;
    } else {
      asleepTime.end = element.time.minute - 1;

      for (let i = asleepTime.begin; i <= asleepTime.end; ++i) {
        maxGuard.times.push(i);
      }

      asleepTime = {};
    }

  });

  // Getting minute the guard slept the most
  const minuteCounts = {};

  maxGuard.times.forEach(function (x) {
    minuteCounts[x] = (minuteCounts[x] || 0) + 1;
  });

  const max = {};
  let ref = 0;
  for (const x in minuteCounts) {
    if (minuteCounts[x] > ref) {
      max.repeated = minuteCounts[x];
      ref = minuteCounts[x];
      max.minute = x;
    }
  }

  maxGuard.maxMin = max;

  return maxGuard;
};

const processData = function (data) {

  data = sortElements(data);

  const maxGuard = getMaxAsleepTime(data);
  console.log('Part 1 - ID: ' + maxGuard.id + ', minute: ' + maxGuard.maxMin.minute);

  const commonGuard = getCommonAsleepMinute(data);
  console.log('Part 2 - ID: ' + commonGuard.id + ', minute: ' + commonGuard.minute);

  const results = [];
  results[0] = Number(maxGuard.id.slice(1)) * Number(maxGuard.maxMin.minute);
  results[1] = Number(commonGuard.id.slice(1)) * Number(commonGuard.minute);

  return results;
};

// Exporting functions 
module.exports = { readInputFile, getElementInfo, sortElements, getCommonAsleepMinute, getMaxAsleepTime, processData };