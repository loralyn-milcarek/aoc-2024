import * as fs from 'fs';

const filePath = 'input/03.txt';
const fileContent = fs.readFileSync(filePath, 'utf-8');

const reg = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g;
const mul = (x: number, y: number) => x * y;

let sum = 0;
let execute = true;

const expressions = [...fileContent.matchAll(reg)];

for (const expression of expressions) {
    if (expression[0] === 'do()') {
        execute = true;
    } else if (expression[0] === 'don\'t()') {
        execute = false;
    } else if (execute) {
        sum += eval(expression[0])
    }

}

// console.log(sum);
