let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module

    return fs.readFileSync(fileName, 'utf8').trim();
}

// element is an input's raw row
let getElementInfo = function (element, index, array) {
    let i = element.indexOf('-') + 1; // getting date
    let j = element.indexOf(':') + 1; // getting minute
    let k = element.indexOf('#'); // getting guard ID (if exists)
    let asleep = element.indexOf('asleep'); // is guard falling asleep?
    let awake = element.indexOf('wakes'); // is guard waking up?

    let elementInfo = {
        date: {
            month: Number(element.slice(i, i + 2)),
            day: Number(element.slice(i + 3, i + 5))
        },
        time: {
            hour: Number(element.slice(j - 3, j - 1)),
            minute: Number(element.slice(j, j + 2))
        }
    }

    elementInfo.dateTimeNum = (elementInfo.date.month * 70000) +
        (elementInfo.date.day * 2000) +
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

    // elementInfo = { date: {month, day}, time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? } <-- format
    return elementInfo;
}

// data is a string with all the raw input
let sortElements = function (data) { //sort entries chronologically
    data = data.split('\n');

    // Converting into array of objects with extracted info
    data = data.map(getElementInfo);

    data.sort(function (a, b) {
        return a.dateTimeNum - b.dateTimeNum;
    });

    return data;
}

// data is an array of objects with format: { date: {month, day}, time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
let getCommonAsleepMinute = function (data) {
    let ID = [];
    let index = -1;
    let minutes = [];

    for (let i = 0; i < 60; i++) {
        minutes.push(i);
    }

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
    let sleepIntervals = [];
    let interval = [];

    // Getting total times for each guard ID
    ID.forEach(id => {
        data.forEach(e => {
            if ((e.guardID === id) && !e.hasGuardID) {
                //console.log(e);

                if (e.isAsleep) {
                    interval[0] = e.time.minute;
                } else {
                    interval[1] = e.time.minute - 1;
                    //console.log(interval);

                    let arr = [];
                    for (let i = interval[0]; i <= interval[1]; i++) {
                        arr.push(i);

                    }

                    sleepIntervals = sleepIntervals.concat(arr);
                    //console.log(sleepIntervals);

                }


            }
        });
        totalTimes.push([...sleepIntervals]);
        sleepIntervals = [];
        totalT = 0;
    });

    console.log("ID length: " + ID.length);
    console.log(ID);

    console.log("totalTimes length: " + totalTimes.length);
    console.log(totalTimes);

    //Getting common minutes for each guard
    let totalMinutes = [];
    totalTimes.forEach(function (x) {
        let minuteCounts = {};
        let max = {};
        let ref = 0;
        x.forEach(function (i) {
            minuteCounts[i] = (minuteCounts[i] || 0) + 1;

            if (minuteCounts[i] > ref) {
                max.repeated = minuteCounts[i];
                ref = minuteCounts[i];
                max.minute = i;
            }
        });

        // console.log(max);
        
        totalMinutes.push(max);
    });

    console.log("totalMinutes length: " + totalMinutes.length);
    console.log(totalMinutes);

    let asleepGuard = {};
    totalMinutes.map((min, index) => {
        if (index === 0) {
            asleepGuard.id = ID[index];
            asleepGuard.repeated = min.repeated;
            asleepGuard.minute = min.minute;
        } else if (min.repeated > asleepGuard.repeated){
            asleepGuard.id = ID[index];
            asleepGuard.repeated = min.repeated;
            asleepGuard.minute = min.minute;
        }
    });

    console.log("asleepGuard: ");
    console.log(asleepGuard);
    
    
    return asleepGuard;
}

// data is an array of objects with format: { date: {month, day}, time: {hour, minute}, dateTimeNum, guard ID?, ID || is guard asleep? }
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