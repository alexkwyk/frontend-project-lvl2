import _ from 'lodash'
import parse from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

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