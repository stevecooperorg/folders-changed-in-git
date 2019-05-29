import {readFileSync} from 'fs';

const content = readFileSync('out/package-change-histogram.txt', 'utf-8')
    .split("\n")
    .filter(x => x.length !== 0);

const analysis: { count: number, fraction: number, rest: string[] }[] = [];
for(const line of content) {
    const [countString, ...rest] = line.trim().split(" ");
    analysis.push({
        count: parseInt(countString, 10),
        fraction: 0,
        rest
    });
}

let sum = 0;
for(const item of analysis) {
    sum += item.count;
}

for(const item of analysis) {
    item.fraction = Math.floor((item.count / sum) * 10000.0) / 100;
    console.log(`${item.fraction},${item.rest.join(" ")}`);
}
