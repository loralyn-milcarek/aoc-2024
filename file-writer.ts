const fs = require('fs');

const writeCurrentDayFiles = () => {
  const today = new Date().getDate();

  const fileDate = today < 10 ? `0${today}` : today.toString();

  fs.writeFileSync(
    `puzzles/${fileDate}.ts`,
    `import { readFileSync } from 'fs';

`
  );

  fs.writeFileSync(`input/${fileDate}.txt`, '');
};

writeCurrentDayFiles();
