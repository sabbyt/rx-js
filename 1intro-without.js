var source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

var result = source
  // goes through each item in source
  .map(x => parseInt(x))
  // filters out non parseable values
  .filter(x => !isNaN(x))
  // adds to create a final result integer
  .reduce((x, y) => x + y);

console.log(result);
