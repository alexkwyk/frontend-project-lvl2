import * as fs from 'node:fs';
import * as path from 'node:path'
import * as process from 'node:process'
import _ from 'lodash'

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8'));

  const mergedKeys = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqueKeys = _.uniq(mergedKeys);

  const result = uniqueKeys.reduce((acc, key) => {
    const [firstFileOutput, commonOutput, secondFileOutput] = acc;
    const hasKey1 = Object.hasOwn(file1, key);
    const hasKey2 = Object.hasOwn(file2, key);
    const Value1 = file1?.[key];
    const Value2 = file2?.[key];
    if (hasKey1 === hasKey2) {
      if (Value1 === Value2) {
        commonOutput.push(`${key}: ${Value1}`)
      } else {
        commonOutput.push(`- ${key}: ${Value1}`);
        commonOutput.push(`+ ${key}: ${Value2}`);
      }
    } else if (hasKey1) {
      firstFileOutput.push(`- ${key}: ${Value1}`);
    } else if (hasKey2) {
      secondFileOutput.push(`+ ${key}: ${Value2}`);
    }
    return acc;
  }, [[], [], []])
  .flat();
  return `{\n  ${result.join('\n  ')} \n}`;
};

export default genDiff;