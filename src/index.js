import * as fs from 'node:fs';
import _ from 'lodash'

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1));
  const file2 = JSON.parse(fs.readFileSync(filepath2));

  const mergedValues = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqueValues = _.uniq(mergedValues);

  const result = uniqueValues.reduce((acc, key) => {
    const [firstFileOutput, commonOutput, secondFileOutput] = acc;
    const hasKey1 = Object.hasOwn(file1, key);
    const hasKey2 = Object.hasOwn(file2, key);
    const Value1 = file1?.[key];
    const Value2 = file2?.[key];
    if (hasKey1 === hasKey2) {
      if (Value1 === Value2) {
        commonOutput.push(`${key}: ${Value1}`)
        return acc;
      }
      commonOutput.push(`- ${key}: ${Value1}`);
      commonOutput.push(`+ ${key}: ${Value2}`);
      return acc;
    }
    if (hasKey1) {
      firstFileOutput.push(`- ${key}: ${Value1}`);
      return acc;
    }
    if (hasKey2) {
      secondFileOutput.push(`+ ${key}: ${Value2}`);
      return acc;
    }
  }, [[], [], []]).flat();
  return `{\n  ${result.join('\n  ')} \n}`;
};

export default genDiff;