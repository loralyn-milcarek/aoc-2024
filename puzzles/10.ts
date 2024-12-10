import { readFileSync } from 'fs';

const fileContent = readFileSync('input/10.txt', 'utf-8');

const grid = fileContent.split('\n').map(x => x.split('').map(x => Number(x)));
// grid;

let ninesReached = 0;
const trailheadScores: number[] = [];

let nineCache = {} as { [key: number]: Set<number> }

const addNineToCache = (x: number, y: number) => {
    if (nineCache[x] === undefined) {
        nineCache[x] = new Set();
    }
    nineCache[x].add(y);
}

const clearNineCache = () => nineCache = {} as { [key: number]: Set<number> };

const countNineCache = () => {
    let sum = 0;
    for (const key in nineCache) {
        sum += nineCache[key].size;
    }
    return sum;
};

const isNextValueEast = (current: number, x: number, y: number) => {
    if (grid[x][y + 1] === 9) {
        addNineToCache(x, y + 1);
        return false;
    }
    return grid[x][y + 1] === current + 1;
}

const isNextValueSouth = (current: number, x: number, y: number) => {
    if (grid[x + 1] && grid[x + 1][y] === 9) {
        addNineToCache(x + 1, y);
        return false;
    }
    return grid[x + 1]
        && grid[x + 1][y] === current + 1;
}

const isNextValueWest = (current: number, x: number, y: number) => {
    if (grid[x][y - 1] === 9) {
        addNineToCache(x, y - 1);
        return false;
    }
    return grid[x][y - 1] === current + 1;
}

const isNextValueNorth = (current: number, x: number, y: number) => {
    if (grid[x - 1] && grid[x - 1][y] === 9) {
        addNineToCache(x - 1, y);
        return false;
    }
    return grid[x - 1]
        && grid[x - 1][y] === current + 1;
}

function findNextValue(current: number, x: number, y: number) {
    if (isNextValueEast(current, x, y)) findNextValue(current + 1, x, y + 1);
    if (isNextValueSouth(current, x, y)) findNextValue(current + 1, x + 1, y);
    if (isNextValueWest(current, x, y)) findNextValue(current + 1, x, y - 1);
    if (isNextValueNorth(current, x, y)) findNextValue(current + 1, x - 1, y);
}

function traverseMap() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                clearNineCache();
                findNextValue(0, i, j);
                trailheadScores.push(countNineCache());
            }
        }
    }
    return trailheadScores.reduce((x, y) => x + y, 0);
}


// console.log(traverseMap());
// trailheadScores;
// grid;















// function position(value: number, x: number, y: number) {
//     this.value = value;
//     this.x = x;
//     this.y = y;
//     this.ninesReached = 0;
//     this.moveEast = (value: number, x: number, y: number) => {
//         const next = grid[x][y + 1];
//         // if num is one larger than value
//         if (value + 1 === next) {
//             // if num is 9
//             if (next === 9) {
//                 // overwrite 9, return 1
//                 grid[x][y + 1] = -1;
//                 return 1;
//             }
//             // call moveEast
//             return this.moveEast(next, x, y + 1);
//             // call moveSouth
//             return this.moveSouth(next, x, y + 1);
//             // call moveWest

//             // call moveNorth
//         }
//         // return 0;
//     };
//     this.moveSouth = () => {};
//     this.moveWest = () => {};
//     this.moveNorth = () => {};
// }