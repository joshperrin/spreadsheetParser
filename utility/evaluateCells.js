const { postFixCalc } = require('./postFixCalc');
const { parseRefs } = require('./parseRefs');


function evaluateCells (obj) {
  // create a new object to store results
  const resObj = {};

  // loops through the object to parse and caclulate each cell
  for ( cell in obj ) {

    // split string into array and remove empty entries
    const cellContents = obj[cell].split(" ").filter(n => n);

    // if the cell is empty, return 0
    if (!cellContents.length) {
      resObj[cell] = 0;
    } else {
      // parse cell refs for values
      const parsedCell = parseRefs(obj[cell], obj);
      // compute values with postFix notation
      const cellResult = postFixCalc(parsedCell);
      // save result in new object
      resObj[cell] = cellResult;
    }
  }

  // return the results
  return resObj;
}

// Export this function
module.exports = { evaluateCells };