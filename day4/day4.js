let readInputFile = function (fileName) {
    const { readFileSync } = require('fs'); // Adding file system module

    return readFileSync(fileName, 'utf8').trim();
}

// element is an input's raw row
let getElementInfo = function (element, index, array) {
    let i = element.indexOf('-') + 1; // getting date
    let j = element.indexOf(':') + 1; // getting minute
    let k = element.indexOf('#'); // getting guard ID (if exists)
    let asleep = element.indexOf('asleep'); // is guard falling asleep?
    let awake = element.indexOf('wakes'); // is guard waking up?

    let elementInfo = {
        time: {
            hour: Number(element.slice(j - 3, j - 1)),
            minute: Number(element.slice(j, j + 2))
        }
    }

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

        let endID = element.slice(k).indexOf(' ');

        elementInfo.guardID = element.slice(k, k + endID); // guard ID
    }

    // elementInfo = { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? } <-- format
    return elementInfo;
}

// data is a string with all the raw input
let sortElements = function (data) {
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
}

// data is an array of objects with format: { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
let getCommonAsleepMinute = function (data) {

    // Getting unique Ids
    let ID = data.map(x => x.guardID).filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    let totalTimes = [];
    let sleepIntervals = [];
    let init = 0;
    let asleepGuard = {};

    ID.forEach((id, index) => {
        // Getting rows with id
        let idData = data.filter(e => (e.guardID === id) && !e.hasGuardID); 

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
        let minuteCounts = {};
        let max = {};
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

        // totalTimes.push(max);
        sleepIntervals = [];
    });

    console.log("asleepGuard: ");
    console.log(asleepGuard);

    return asleepGuard;
}

// data is an array of objects with format: { time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
let getMaxAsleepTime = function (data) {
    let ID = [];
    let index = -1;

    // Adding corresponding ids
    data.forEach(element => {
        if (element.hasGuardID) {
            ID.push(element.guardID);
            ++index;
        } else {
            element.guardID = ID[index];
        }
    });

    // Leave only unique values
    ID = ID.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    let totalTimes = [];
    let initTime = 0;
    let totalT = 0;

    // Getting total times for each guard ID
    ID.forEach(id => {
        data.forEach(e => {
            if ((e.guardID === id) && !e.hasGuardID) {
                if (e.isAsleep) {
                    initTime = e.time.minute;
                } else {
                    totalT += e.time.minute - initTime;
                    initTime = 0;
                }
            }
        });

        totalTimes.push(totalT);
        totalT = 0;
    });

    // Getting guard with more time asleep
    let maxAsleep = Math.max(...totalTimes);
    let maxGuard = {};

    for (let i = 0; i < totalTimes.length; i++) {
        if (totalTimes[i] === maxAsleep) {
            maxGuard.id = ID[i];
            maxGuard.totalTime = maxAsleep;
            break;
        }
    }

    // Constructing object with guard's info
    maxGuard.times = [];
    let asleepTime = {};

    for (let j = 0; j < data.length; ++j) {
        if ((data[j].guardID == maxGuard.id) && !data[j].hasGuardID) {
            if (data[j].isAsleep) {
                asleepTime.begin = data[j].time.minute;
            } else {
                asleepTime.end = data[j].time.minute - 1;
                asleepTime.mins = [];

                for (let i = asleepTime.begin; i <= asleepTime.end; ++i) {
                    asleepTime.mins.push(i);
                }

                maxGuard.times.push(asleepTime);
                asleepTime = {};
            }
        }
    }

    // Getting most common minute
    let intersection = [];
    let minuteCounts = {};

    maxGuard.times.forEach(element => {
        intersection = intersection.concat(element.mins);
    });

    intersection.forEach(function (x) {
        minuteCounts[x] = (minuteCounts[x] || 0) + 1;
    });

    let max = {};
    let ref = 0;
    for (let x in minuteCounts) {
        if (minuteCounts[x] > ref) {
            max.repeated = minuteCounts[x];
            ref = minuteCounts[x];
            max.minute = x;
        }
    }

    maxGuard.maxMin = max;

    return maxGuard;
}

let processData = function (data) {

    data = sortElements(data);

    getCommonAsleepMinute(data);

    let guard = getMaxAsleepTime(data);

    console.log("ID: " + guard.id + ", minute: " + guard.maxMin.minute);

    let result = Number(guard.id.slice(1)) * Number(guard.maxMin.minute);

    return result;
}

// Exporting functions 
module.exports = { readInputFile, getElementInfo, sortElements, getMaxAsleepTime, processData };