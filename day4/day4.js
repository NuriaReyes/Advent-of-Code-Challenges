let readInputFile = function (fileName) {
    let fs = require('fs'); // Adding file system module

    // Getting raw content (string format)
    let content = fs.readFileSync(fileName, 'utf8');

    return content;
}

// element is an input's raw row
let getElementInfo = function (element) {
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

    // elementInfo will be an object with the extracted info: date, time, is there guard ID?, 
    // if there is guard ID - the ID otherwise is the guard asleep?
    // elementInfo = { date: {month, day}, time: {hour, minute}, guard ID?, ID || is guard asleep? } <-- format
    return elementInfo;
}

// data is a string with al the raw input
let sortElements = function (data) { //sort entries chronologically
    data = data.split('\n');

    // Converting into array of objects with extracted info
    data = data.map(getElementInfo);

    let subArray = [];
    let months = [];
    let days = [];
    let hours = [];
    let minutes = [];

    for (let i = 1; i <= 12; i++) {
        months = data.filter(x => (x.date.month === i));

        if (months.length > 0) {

            for (let j = 1; j <= 31; j++) {
                days = months.filter(x => (x.date.day === j));

                if (days.length > 0) {

                    for (let k = 0; k <= 23; k+=23) {
                        hours = days.filter(x => (x.time.hour === k));

                        if (hours.length > 0)
                        {

                            for (let m = 0; m <= 59; m++) {
                                minutes = hours.filter(x => (x.time.minute === m));

                                if (minutes.length > 0) subArray = subArray.concat(minutes);
                            }
                        }

                    }
                }
            }
        }
    }

    return subArray;
}

// data is an array of objects with format: { date: {month, day}, time: {hour, minute}, guard ID?, ID || is guard asleep? }
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

    intersection.forEach( function(x) { 
                            minuteCounts[x] = (minuteCounts[x] || 0) + 1; 
                        });

    maxGuard.commonMins = minuteCounts;

    return maxGuard;
}

let processData = function (data) {

    data = sortElements(data);

    let guard = getMaxAsleepTime(data);

    return guard;
}

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file " + args[0] + "...\n");

    let content = readInputFile(args[0]);

    guard = processData(content);

    console.log("Processing input..." + "\n");

    console.log("Guard info: ");

    console.log(guard);

} else {
    let data = '[1518-11-01 00:00] Guard #10 begins shift \
                \n[1518-11-01 00:05] falls asleep \
                \n[1518-11-01 00:25] wakes up \
                \n[1518-11-01 00:30] falls asleep \
                \n[1518-11-01 00:55] wakes up \
                \n[1518-11-01 23:58] Guard #99 begins shift \
                \n[1518-11-02 00:40] falls asleep \
                \n[1518-11-02 00:50] wakes up \
                \n[1518-11-03 00:05] Guard #10 begins shift \
                \n[1518-11-03 00:24] falls asleep \
                \n[1518-11-03 00:29] wakes up \
                \n[1518-11-04 00:02] Guard #99 begins shift \
                \n[1518-11-04 00:36] falls asleep \
                \n[1518-11-04 00:46] wakes up \
                \n[1518-11-05 00:03] Guard #99 begins shift \
                \n[1518-11-05 00:45] falls asleep \
                \n[1518-11-05 00:55] wakes up';

    console.log("No file entered...");
    console.log("Default raw data: \n" + data + "\n");

    myData = processData(data);

    console.log("Executing default input..." + "\n");

    console.log("Guard info: ");

    console.log(myData);

}