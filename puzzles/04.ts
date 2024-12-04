import { readFileSync } from 'fs';

const fileContent = readFileSync('input/04.txt', 'utf-8');

const grid: string[] = fileContent.split(`\n`);

const isX = (char: string) => char === 'X';
const isM = (char: string) => char === 'M';
const isA = (char: string) => char === 'A';
const isS = (char: string) => char === 'S';

function findEast(i: number, j: number) {
    return grid[i][j + 3]
        && isM(grid[i][j + 1])
        && isA(grid[i][j + 2])
        && isS(grid[i][j + 3]);
}

function findWest(i: number, j: number) {
    return grid[i][j - 3]
        && isM(grid[i][j - 1])
        && isA(grid[i][j - 2])
        && isS(grid[i][j - 3]);
}

function findSouth(i: number, j: number) {
    return grid[i + 3]
        && isM(grid[i + 1][j])
        && isA(grid[i + 2][j])
        && isS(grid[i + 3][j])
}

function findNorth(i: number, j: number) {
    return grid[i - 3]
        && isM(grid[i - 1][j])
        && isA(grid[i - 2][j])
        && isS(grid[i - 3][j])
}

function findNortheast(i: number, j: number) {
    return grid[i - 3]
        && grid[i - 3][j + 3]
        && isM(grid[i - 1][j + 1])
        && isA(grid[i - 2][j + 2])
        && isS(grid[i - 3][j + 3])
}

function findSoutheast(i: number, j: number) {
    return grid[i + 3]
        && grid[i + 3][j + 3]
        && isM(grid[i + 1][j + 1])
        && isA(grid[i + 2][j + 2])
        && isS(grid[i + 3][j + 3])
}

function findNorthwest(i: number, j: number) {
    return grid[i - 3]
        && grid[i - 3][j - 1]
        && isM(grid[i - 1][j - 1])
        && isA(grid[i - 2][j - 2])
        && isS(grid[i - 3][j - 3])
}

function findSouthwest(i: number, j: number) {
    return grid[i + 3]
        && grid[i + 3][j - 3]
        && isM(grid[i + 1][j - 1])
        && isA(grid[i + 2][j - 2])
        && isS(grid[i + 3][j - 3])
}

function countXmas() {
    let count = 0;

    for (let i = 0; i < grid.length; i++) { // outer loop (rows): i

        const row = grid[i];

        for (let j = 0; j < row.length; j++) { // inner loop (columns): j

            if (isX(row[j])) {
                if (findEast(i, j)) count++;
                if (findWest(i, j)) count++;
                if (findSouth(i, j)) count++;
                if (findNorth(i, j)) count++;
                if (findNortheast(i, j)) count++;
                if (findSoutheast(i, j)) count++;
                if (findNorthwest(i, j)) count++;
                if (findSouthwest(i, j)) count++;
            }

        }

    }

    return count;
}


// console.log(countXmas())

function findMas(i: number, j: number) {
    const se = grid[i + 1][j + 1];
    const sw = grid[i + 1][j - 1];
    const ne = grid[i - 1][j + 1];
    const nw = grid[i - 1][j - 1];


    const isMValid = (
        (isM(se) && isM(sw))
        || (isM(se) && isM(ne))
        || (isM(sw) && isM(nw))
        || (isM(ne) && isM(nw))
    );

    const isAValid = (
        (isS(se) && isS(sw))
        || (isS(se) && isS(ne))
        || (isS(sw) && isS(nw))
        || (isS(ne) && isS(nw))
    );

    return isMValid && isAValid;
}


function countXs() {
    let count = 0;

    for (let i = 1; i < grid.length - 1; i++) { // outer loop (rows): i

        const row = grid[i];

        for (let j = 1; j < row.length - 1; j++) { // inner loop (columns): j

            if (isA(row[j])) {
                if (findMas(i, j)) count++
            }

        }

    }

    return count;
}

// console.log(countXs());