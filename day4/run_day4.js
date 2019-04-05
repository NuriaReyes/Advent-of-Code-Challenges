const { readInputFile, processData } = require('./day4');

if (process.argv.length > 2) { //user added arguments

    // Getting user's specified arguments
    let args = process.argv.slice(2); // first 2 elements being node and js file
    console.log("Reading file " + args[0] + "...\n");

    let content = readInputFile(args[0]);

    console.log("Processing input..." + "\n");

    let result = processData(content);

    console.log("Result: " + result);

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

    console.log("Executing default input..." + "\n");

    myData = processData(data);
    
    console.log("Result: ");

    console.log(myData);
}