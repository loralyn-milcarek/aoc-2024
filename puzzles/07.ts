import { readFileSync } from 'fs';

const fileContent = readFileSync('input/07.txt', 'utf-8');

const equations: number[][] = fileContent.split('\n').map(x => {
  return [
    Number(x.slice(0, x.indexOf(':'))),
    ...(x.slice(x.indexOf(' ') + 1).split(' ')).map(x => Number(x))
  ]
});

function canReachTarget(row, target) {
  function backtrack(index, currentResult) {
    if (index === row.length) {
      return currentResult === target;
    }

    const currentNum = row[index];

    // Option 1: Add
    if (backtrack(index + 1, currentResult + currentNum)) {
      return true;
    }

    // Option 2: Multiply
    if (backtrack(index + 1, currentResult * currentNum)) {
      return true;
    }

    // Option 3: Concatenate
    if (backtrack(index + 1, Number('' + currentResult.toString() + currentNum.toString()))) {
      return true;
    }

    return false;
  }

  return backtrack(1, row[0]);
}

function isValidEquation(row: number[]): number {
  const result = row.shift();
  if (!result) return 0;

  const rowSum = row.reduce((x, y) => x + y);
  if (rowSum === result) {
    return result;
  }
  
  const rowProduct = row.reduce((x, y) => x * y);
  if (rowProduct === result) {
    return result;
  }

  return canReachTarget(row, result) 
    ? result
    : 0;
}

const sum = equations.reduce((x, row) => {
  return x + isValidEquation(row);
}, 0);


// sum; // part 1 test: 3749
// sum; // part 1: 12553187650171
// sum; // part 2 test: 11387
sum; // part 2: 
// console.log(sum > 3749);
console.log(sum > 14044210945341);


// 292:     11     6     16     20
//          11 * 6 + 16 + 20 === 102  
//            0, 66, 36
//          11 * 6 * 16 + 20 === 1056
//            66, 16, 20
//          11 * 6 + 16 * 20 === 1640
//            66, 320, 0
//          11 + 6 * 16 + 20 === 292
//            17, 272, 20