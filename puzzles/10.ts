import { readFileSync } from 'fs';

const fileContent = readFileSync('input/10.txt', 'utf-8');

const grid = fileContent.split('\n').map(x => x.split('').map(x => Number(x)));

const trailheadScores: number[] = [];

let isDistinct = true;
let isRating = false;

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

const rateTrailHead = () => {};

const handleNine = (x: number, y: number) => {
    if (isDistinct) addNineToCache(x, y);
    if (isRating) rateTrailHead;
}

const isNextValueThere = (current: number, x: number, y: number, xChange: number, yChange: number) => {
    const newX = x + xChange;
    const newY = y + yChange;

    if (current === 8
        && grid[newX]
        && grid[newX][newY] === 9) {
            handleNine(newX, newY);
        return false;
    }
    return grid[newX] && grid[newX][newY] === current + 1;
}

const findNextValue = (current: number, x: number, y: number) => {
    if (isNextValueThere(current, x, y, 0, 1)) findNextValue(current + 1, x, y + 1);
    if (isNextValueThere(current, x, y, 1, 0)) findNextValue(current + 1, x + 1, y);
    if (isNextValueThere(current, x, y, 0, -1)) findNextValue(current + 1, x, y - 1);
    if (isNextValueThere(current, x, y, -1, 0)) findNextValue(current + 1, x - 1, y);
}

const traverseMap = () => {
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


console.log(traverseMap()); // 36, 737




