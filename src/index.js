import * as fs from 'node:fs';
import _ from 'lodash'
const filepath1 = './assets/file1.json';
const filepath2 = './assets/file2.json';
const file1 = JSON.parse(fs.readFileSync(filepath1));
const file2 = JSON.parse(fs.readFileSync(filepath2));
const firstFileValues = Object.entries(file1);
const secondFileValues = Object.entries(file2);
const mergedValues = [...firstFileValues, ...secondFileValues];
const result = mergedValues.reduce((acc, item) => {
  const [key, value] = item;
  const output = item.join(': ');
  if (file1[key] === value && file2[key] === value) {
    const output = item.join(': ');
    if (acc.includes(output)) {
      return [...acc];
    }
    return [...acc, output];
  }
  if (file1[key] === value) {
    return [...acc, `- ${output}`];
  }
  if (file2[key] === value) {
    return [...acc, `+ ${output}`];
  }
}, [])
.sort((a,b) => {
  if (a.slice(0,1) === '-') return -1;
  if (a.slice(0,1) === '+') return 0;
  return 0;
});
console.log(result)