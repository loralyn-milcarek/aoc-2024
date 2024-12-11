import { readFileSync } from 'fs';

const fileContent = readFileSync('input/11.txt', 'utf-8');
const stonesArray = fileContent.split(' ');

const changeStone = (stone: string) => {
    if (stone === '0') {
        return '1';
    } else if (stone.length % 2 === 0) {
        return [
            Number(stone.slice(0, stone.length / 2)).toString(), 
            Number(stone.slice(stone.length / 2)).toString()
        ];
    } else {
        return (Number(stone) * 2024).toString();
    }
};

const blink = (times: number, stones: string[], blinkedStones: string[] = []) => {
    if (times === 0) return stones.length;

    stones.forEach(stone => {
        const newStone = changeStone(stone);
        if (Array.isArray(newStone)) {
            blinkedStones.push(newStone[0], newStone[1]);
        } else {
            blinkedStones.push(newStone)
        }
    });

    return blink(times - 1, blinkedStones, []);
}

// console.log(blink(6, stonesArray)); // 22, 70
// console.log(blink(25, stonesArray)); // 55312, 194482
