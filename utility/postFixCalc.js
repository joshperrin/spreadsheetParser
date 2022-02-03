/**
 * POST FIX EVALUATION
 * 
 * Evaluates a simple math expression
 * in the postfix notation.
 */

 function postFixCalc (exp) {
  /* 
    setup object with operation functions to perform calculations for 
    each of the basic arithmetic operators 
  */
  const calc = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b,
    '/' : (a, b) => a / b
  }
  /* 
    split expression into an array divided by a space and then map into an array
    organized by number and operator
  */
  const expArray = exp.split(" ").map(i =>  {return Number(i) ? Number(i) : i});
  /* setup stack for storing results from calculations */
  const stack = [];
  /* 
    loop through the organized array 
    if the item is an operator, spread and splice the array to grab the relevant numbers 
    and perform the appropriate calculation and store the result in the stack
    if it's a number, store it in the stack
  */
  expArray.forEach(op => {
    stack.push ( 
      calc[op] 
        ? calc[op](...stack.splice(-2))
        : op
      )
  });
  /* 
    if the stack is empty or contains a NaN, return an error, else
    return the result of the calculation
  */
  if (stack.length > 1 || stack.includes(NaN)) {
    return '#ERR';
  } else {
    return stack[0];
  }
}

// Export this function
module.exports = { postFixCalc };