# Spreadsheet Parser

This is a command line spreadsheet parser that evalues using postfix notation. It is a coding exercise solution.

# Original Task Description

Write a program to parse a given CSV file and evaluate each cell by these rules
1. Each cell is an expression in postfix notation. 
2. Each number or operation will always be separated by one or more spaces.
3. A cell can refer to another cell, via the LETTER NUMBER notation (A2, B4, etc - letters
refer to columns, numbers to rows). You can assume it’s a single letter followed by a
number to make parsing a bit easier.
4. Support the basic arithmetic operators +, -, *, /
The output will be a CSV file of the same dimensions, where each cell is evaluated to its final
value. If any cell is an invalid expression, then for that cell only print #ERR.

# Running the Code
To run the program, run (using node.js):

    node spreadsheetParser.js test-input-1.csv  
    

A sample CSV input:

    b1 b2 +,2 b2 3 * -,3 ,+
    a1 ,5 , ,7 2 /
    c2 3 * ,1 2 , ,5 1 2 + 4 * + 3 -
    
With an expected output of 

    -8,-13,3,#ERR
    -8,5,0,3.5
    0,#ERR,0,14



## Limitations
- The number of columns is constrained to 26, as the columns are restricted to a single letter from a to z.
- CSV file must use ',' to seperate values and not any other characters
- Rows must be deliminated by line breaks
- Cell operations must be seperated by one or more spaces.
- The script will output the result to the STDOUT
- Performace has not been optimized, or been considered in this implementation



# Breaking down the code

The code has been heavily commented to provide it's own documentation of how the script works. The main script is in spreadsheetParser.js. The corresponding utility functionality has been broken down into a few files within the utility folder. The code was written with clarity and an obvious flow as it's priority.


## spreadsheetParser.js

This file runs through the main steps of the program: 
1. **[`parseCSV`](###parseCSV.js)** - it grabs the filename from the passed in arguments and passes it to the parseCSV function. The parseCSV function returns an object with the csv data as a JSON object, as well as the number of rows to make it easier to parse back to CSV format.
2. **[`evaluateCells`](###evaluateCells.js)** - then runs the json data through the evaluateCells function, which evaluates all of the cell references, and then performs the postfix calculations on each cell.
3. **parses CSV** - finally the object with the calculated results is then parsed back into a CSV formatted string and printed to the terminal.



## Utility Functions


### parseCSV.js

The parse CSV function grabs the file passed in via an argument, checks to see if there is a filename and a file with data exsits. Then attemps to parse the CSV data into a JSON object with the keys representing the cell location notated via LETTER NUMBER notation and the values representing the value of the corresponding cell.


### evaluateCells.js

The evaluteCells function does all of the calculation work. It loops through all of the cells in the object and for each one: 1. **[`parseRefs`](####parseRefs.js)** - it calls the parseRefs function and parses all of the cell references
2. **[`postFixCalc`](####postFixCalc.js)** - then calls the postFixCalc function to calculate the results of each cell


#### parseRefs.js

The parseRefs function tries to follow all of the cell references in each cell, it also checks to ensure refs are formatted properly and that there are no circular references.


#### postFixCalc.js

The postFixCalc function attempts to calculate all of the cell values via [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), if it can't find a result, it sets the cell to '#ERR'.


# Test Data

I've included 4 different test csv files to test the script

# Platfrom

This script was written and tested on node.js v16.13.2