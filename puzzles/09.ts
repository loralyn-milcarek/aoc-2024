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

function findValidSpace(size: number, end: number): number {
    let isValid = false;
    for (let i = 0; i < end; i++) {
            if (fileBlocks[i] !== null) continue;

            for (let j = i; j <= i + size; j++) {
                if (fileBlocks[j] !== null) {
                    // isValid = false
                    break;
                }

                isValid = true;
            }

            if (isValid) return i;
    }

    return -1;
}

function moveSingleFile(newStart: number, size: number, oldStart: number, oldEnd: number, fileNumber: number) {
    for (let i = newStart; i < (newStart + size); i++) {
        fileBlocks[i] = fileNumber;
    }
    for (let i = oldStart; i <= oldEnd; i++) {
        fileBlocks[i] = null;
    }
}

const movedFiles: Set<number> = new Set();

function moveWholeFiles() {
    let start = 0;
    // iterate backwards through fileBlocks
    for (let i = fileBlocks.length - 1; i > start; i--) {
        // if !== null, find file number and size
        const fileNumber = fileBlocks[i];
        let size = 1;
        let oldStart = i;
        if (fileNumber !== null && !movedFiles.has(fileNumber)) {
            movedFiles.add(fileNumber);
            for (let j = i - 1; j > 0; j--) {
                if (fileBlocks[j] === fileNumber) {
                    size++;
                    oldStart = j;
                }
            }
            // call findValidSpace, passing in size and start index of this file block
            const validSpace = findValidSpace(size, oldStart);
            // if >= 0, call moveSingleFile
            if (validSpace >= 0) {
                moveSingleFile(validSpace, size, oldStart, i, fileNumber);
            }
            i -= size - 1;
        }
    }
}

function calculateCheckSum() {
    return fileBlocks.reduce((x, y, i) => {
        if (x === null || y === null) return x;
        return x + (y * i);
    }, 0)
}

createFileBlocks();
moveWholeFiles();
console.log(fileBlocks)
console.log(calculateCheckSum()); // 11387


// console.log(findValidSpace(2, 20));
// fillEmptySpaces();
// console.log(calculateCheckSum()); // 1928, 6288707484810