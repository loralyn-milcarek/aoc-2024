import { readFileSync } from 'fs';

const fileContent = readFileSync('input/06.txt', 'utf-8');

const grid: (string | number)[][] = fileContent.split('\n').map((row) => row.split(''));

let isGuardOnMap = true;
let pathCount = 0;
const moveRight = (i: number, j: number) => {
  if (!isGuardOnMap) return;
  let columnIndex = -1;

  for (let h = j; h < grid[i].length; h++) {
    if (typeof grid[i][h] !== 'number') pathCount++;
    if (grid[i][h] === '#') {
      pathCount--;
      columnIndex = h - 1;
      break;
    }
    grid[i][h] = pathCount;
  }

  if (columnIndex === -1) {
    isGuardOnMap = false;
  }

  moveDown(i, columnIndex);
};

const moveDown = (i: number, j: number) => {
  if (!isGuardOnMap) return;
  let rowIndex = -1;
  for (let h = i; h < grid.length; h++) {
    if (typeof grid[h][j] !== 'number') pathCount++;
    if (grid[h][j] === '#') {
      pathCount--;
      rowIndex = h - 1;
      break;
    }
    grid[h][j] = pathCount;
  }

  if (rowIndex === -1) {
    isGuardOnMap = false;
  }

  moveLeft(rowIndex, j);
};

const moveLeft = (i: number, j: number) => {
  if (!isGuardOnMap) return;
  let columnIndex = -1;

  for (let h = j; h >= 0; h--) {
    if (typeof grid[i][h] !== 'number') pathCount++;
    if (grid[i][h] === '#') {
      pathCount--;
      columnIndex = h + 1;
      break;
    }
    grid[i][h] = pathCount;
  }

  if (columnIndex === -1) {
    isGuardOnMap = false;
  }

  moveUp(i, columnIndex);
};

const moveUp = (i: number, j: number) => {
  if (!isGuardOnMap) return;
  let rowIndex = -1;
  for (let h = i; h >= 0; h--) {
    if (typeof grid[h][j] !== 'number') pathCount++;
    if (grid[h][j] === '#') {
      pathCount--;
      rowIndex = h + 1;
      break;
    }

    grid[h][j] = pathCount;
  }

  if (rowIndex === -1) {
    isGuardOnMap = false;
  }
  
  moveRight(rowIndex, j);
};

while (isGuardOnMap) {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const current = row[j];

      if (typeof current === 'number' || current === '#' || current === '.') continue;

      switch (current) {
        case '>':
          moveRight(i, j);
          break;
        case 'v':
          moveDown(i, j);
          break;
        case '<':
          moveLeft(i, j);
          break;
        case '^':
          moveUp(i, j);
          break;
        default:
          console.log('no guard found!');
          break;
      }
    }
  }
}

// console.log(grid)
// console.log(pathCount); // 41
