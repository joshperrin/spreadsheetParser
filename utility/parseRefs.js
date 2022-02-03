/**
 * PARSE REFS
 * 
 */

function parseRefs(cellValue, obj, stack = []) {
  /* 
   * set errorState of plus operator which will evaluate to #ERR 
   * could be a bit more intuative, but it works
  */
  const errorState = '+';
  
  /* 
  * parseRef utility functions 
  * test functions for checking strings
  */
  const hasChars = s => (/[a-z]/i).test(s);

  const haveSpaces = s => (/\s/g).test(s);
  
  const invalidRef = s => (s.replace(/[0-9]/g, '').length > 2) || (s.length <= 1 && (/[a-z]/i).test(cellValue));


  /* 
  * MAIN FUNCTION
  */ 
  if (!hasChars(cellValue)) {
    /* check if there are any letters in the value, if not, it's ready to go */
    return cellValue.trim();
  } else {
    /* split passed in string to array */
    const cellArray = cellValue.split(" ").filter(n => n);

    // if there are refs parse the cell referneces
    const refResult = cellArray.map(i => obj[i] ? obj[i] : i);

    // check if references are valid
    if (!haveSpaces(cellValue) && invalidRef(cellValue)) {
      console.log(`Warning: cell ref ${cellValue} not valid, cell references must be single letter followed by a number`);
      return errorState;
    }

    // push cellValue into stack to track for circular references
    stack.push(cellValue);
    // checkif cell has a circular reference
    if (cellValue == refResult[0] || stack.includes(refResult[0])) {
      // if circular log warning, and set to plus operator which will evaluate to #ERR
      console.log(`Warning: circular referance in cell ${cellValue}, could not parse value`);
      refResult[0] = errorState;
    }

    // recursively check the results of the parsed cell  
    const resultArray = refResult.map(e => parseRefs(e, obj, stack));

    // return result as string sperated by spaces
    return resultArray.join(' ');
  }
};

// Export this function
module.exports = { parseRefs };