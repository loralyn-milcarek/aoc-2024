import { readFileSync } from 'fs';

const fileContent = readFileSync('input/09.txt', 'utf-8');

const fileBlocks: (number | null)[] = [];

function createFileBlocks() {
    let id = 0;
    for (let i = 0; i < fileContent.length; i++) {
        if (i % 2 === 0) {
            addBlocks(id, fileContent[i]);
            id++;
        } else {
            addSpaces(fileContent[i]);
        }

    }
}

function addBlocks(id: number, blockCountString: string) {
    let blockCount = Number(blockCountString);

    while (blockCount > 0) {
        fileBlocks.push(id);
        blockCount--;
    }
}

function addSpaces(spaceCountString: string) {
    let spaceCount = Number(spaceCountString);

    while (spaceCount > 0) {
        fileBlocks.push(null);
        spaceCount--;
    }
}

createFileBlocks();

function fillEmptySpaces() {
    for (let i = 0; i < fileBlocks.length; i++) {
        if (fileBlocks[i] !== null) continue;

        let fileToMove: number | null | undefined = null;
        while (fileToMove === null || fileToMove === undefined) {
            fileToMove = fileBlocks.pop();
        }
        fileBlocks[i] = fileToMove;
    }
}

fillEmptySpaces();

function calculateCheckSum() {
    return fileBlocks.reduce((x, y, i) => {
        if (x === null || y === null) return x;
        return x + (y * i);
    }, 0)
}

// console.log(calculateCheckSum()); // 1928, 6288707484810