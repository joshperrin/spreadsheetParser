const { parseCSV } = require('./utility/parseCSV');
const { evaluateCells } = require('./utility/evaluateCells');


function spreadsheetParser() {
  // initilize results string
  let results = '';

  /*  get filename from passed in argument */
  const passedInCSV = process.argv[2];

  /* 
    pass the filename to parseCSV() to be parsed and return as an object 
    with the csv cells mapped to a letter number notation with the rowCount
  */
  const { rowCount, data } = parseCSV(passedInCSV);

  /* parse the cells to calculate their outputs */
  const parsedObj = evaluateCells(data);

  /* loop through the number of rows and create a array for the new CSV value */
  const rows = [];
  [...Array(rowCount)].forEach((_, i) => {
    // filter object by row
    const objArray = Object.entries(parsedObj).filter(([key]) => key.includes(i + 1))
    // create row array and push all values into it
    const row = []
    objArray.forEach(([key, value]) => { row.push(value) });
    // push row into the rows array
    rows.push(row)
  });

  /* create csv string */
  rows.forEach(row => { results += `${row}\n` });

  /* print csv to STDOUT with console.log */
  console.log('**** Resulting CSV ****');
  console.log(results);
}

spreadsheetParser();