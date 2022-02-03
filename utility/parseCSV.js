const fs = require('fs');

/**
 * PARSE CSV
 * 
 * Gets a CSV file based on the passed in filename
 * using readFileSync to create a synchronous blocking function
 * if this function was used in parallel with other functionality
 * this function should be converted to be asynchronous
 * 
 * returns an object with the cells mapped to a letter number notation
 */

function parseCSV(fileName) {
  // Check to ensure a filename was passed in
  if (!fileName) return console.error("ERR: File name not provided");

  // Get the file with the readFileSync
  const fileContent = fs.readFileSync(fileName, "utf8",);

  // If the file is empty return an error
  if (!fileContent) return console.error("ERR: File is empty");
  
  // Split the file content into an array of rows
  const rows = fileContent.split(/\r?\n/);

  // Create the object to store the letter number notation map
  const cellsObj = {};
  
  // loop through the rows
  rows.forEach((row, rowIndex) => {

    // create an array of the cells, assuming cells are seperated by commas
    const cells = row.split(',');

    // set the row number
    const rowNum = rowIndex + 1;

    // loop through each cell and add it to the object mapping its letter column and row number by index
    cells.forEach((cell, cellIndex) => {
      // assuming only single letter 
      if (cellIndex >= 26) {
        return console.log(`Warning: Only 26 columns are supported, column ${cellIndex + 1} ignored`);
      }

      // set column letter by it's character code
      const columnChar = String.fromCharCode(97 + cellIndex);
      
      // set the valute of the cell
      cellsObj[`${columnChar}${rowNum}`] = cell;
    })
  })
  
  return {
    rowCount: rows.length,
    data: cellsObj
  };
}

// Export this function
module.exports = { parseCSV };