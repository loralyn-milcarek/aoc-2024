import { readFileSync } from 'fs';

const fileContent = readFileSync('input/05.txt', 'utf-8').split('\n\n');
const rules = fileContent[0].split('\n').map(x => x.split('|'));
const jobs = fileContent[1].split('\n').map(x => x.split(','));
const orderingMap: { key: string, value: string[] } = {} as { key: string, value: string[] };

rules.map(rule => {
    orderingMap[rule[0]]
        ? orderingMap[rule[0]].push(rule[1])
        : orderingMap[rule[0]] = [rule[1]];
})

const sum = jobs.reduce(([validSum, invalidSum], job) => {
    let isValid = true;

    const shallowJob = [...job]
    while (shallowJob.length > 2) {
        const current = shallowJob.pop();
        if (!current) break;
        const successors: string[] = orderingMap[current];
        if (!successors) break;
        if (successors.some(x => shallowJob.includes(x))) {
            isValid = false;
        }
    }

    if (isValid) {
        return [validSum + Number(job[Math.floor(job.length / 2)]), invalidSum]
    } else {
        job.sort((current, next) => {
            return (orderingMap[next] && orderingMap[next].includes(current))
                ? 1
                : -1;
        });
        return [validSum, invalidSum + Number(job[Math.floor(job.length / 2)])];
    }
}, [0, 0]);

sum; // [5129, 4077]