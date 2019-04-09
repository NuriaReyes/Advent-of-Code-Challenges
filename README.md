# Advent of Code Challenges
This repo is to document the code used to solve challenges from https://adventofcode.com/

### To Setup the project you need:
1. Install NodeJS 
    * I am using v10.15.3 
    * You can download it from https://nodejs.org/en/download/
2. Checkout this repository ;)

### The files are organized in folders:
* __dayX__ 
  * `dayX.js`  _Module, where the functions are stored_
  * `input_dayX.txt` _Input file provided by AoC_
  * `run_dayX.js` _Code to run with **input file**_
  * `test_dayX.js` _Tests with sample input provided in AoC_
  * `output_dayX.txt` _File generated by running **run_day10.js** puzzle_

### To run/test files:
* Open command line, and go inside the day's folder you want to run, for example, in Unix/Linux command prompt:

  ```console
  cd ./dayX
  ```
  
* To get the answer to the puzzle with the input provided by AoC:
  * run the file `run_dayX.js` file and as a second parameter the `input_dayX.txt` with node:
  
  ```console
  node run_dayX.js input_dayX.txt
  ```
    * _Note:_ if you don't provide the second parameter, `run_dayX.js` will run with set default data
    * Or you can test the code with your own input, just substitute `input_dayX.txt` for your own file
* To run the test provided with the sample data from AoC: 
  * run the file `test_dayX.js` file with node:
  ```console
  node test_dayX.js
  ```
  
  ### Notes:
  * Day 10 scripts produce an output file (with a set name) `output_dayX.txt`
  * Day 1 and Day 10 scripts will take some time to deliver for the AoC input because it is a lot of data to process, just hang on a moment :)
