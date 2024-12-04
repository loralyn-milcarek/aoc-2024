const fs = require('fs');

const writeCurrentDayFiles = () => {
  const today = new Date().getDate();

  const fileDate = today < 10 ? `0${today}` : today.toString();

  const inputFileName = `input/${fileDate}.txt`;

  fs.writeFileSync(
    `puzzles/${fileDate}.ts`,
    `import { readFileSync } from 'fs';

    const fileContent = fs.readFileSync(inputFileName, 'utf-8');
`
  );

  fs.writeFileSync(inputFileName, '');
};

writeCurrentDayFiles();
