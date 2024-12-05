import { readFileSync } from 'fs';

const fileContent = readFileSync('input/05.txt', 'utf-8');

const rows = fileContent.split('\n');
const breakIndex = rows.indexOf('');
const rules = rows.slice(0, breakIndex);
const printJob = rows.slice(breakIndex + 1);

const orderingMap: { key: string, value: string[] } = {} as { key: string, value: string[] };
rules.map(x => {
    const order = x.split('|');
    orderingMap[order[0]]
        ? orderingMap[order[0]].push(order[1])
        : orderingMap[order[0]] = [order[1]];
})


const jobs = printJob.map(x => x.split(','));
let sum = 0;

for (const job of jobs) {
    let isValid = true;

    const shallowJob = [...job]
    while (shallowJob.length > 1) {
        const current = shallowJob.pop();
        if (!current) break;
        const successors: string[] = orderingMap[current];
        if (!successors) break;
        if (successors.some(x => shallowJob.includes(x))) {
            isValid = false;
        }
    }

    if (isValid) {
        const middleElement = job[Math.floor(job.length / 2)]
        sum += Number(middleElement)
    } 

}

// sum;