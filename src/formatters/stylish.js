import _ from 'lodash'
import stringify from '../utils/stringify.js';

const getValue = (item, depth) => (_.isObject(item)) ? stringify(item, depth + 1) : item;

const stylish = (data) => {
  const iter = (currentData, depth, keyName) => {
    const { type } = currentData;
    const indent = '  '.repeat(2 * depth);
    const lowerIndent = '  '.repeat(2 * depth - 1);
    if (type === 'object') {
      const { value } = currentData;
      const currentEntries = Object.entries(value);
      const dataString = currentEntries.map((item) => {
        const [key, value] = item;
        return `${iter(value, depth + 1, key)}`;
      });
      const result = `${dataString.join('\n')}`;
      return `${indent}${keyName}: {\n${result}\n${indent}}`;
    }
    if (type === 'equal') {
      const { value } = currentData;
      return `${indent}${keyName}: ${value}`
    }
    if (type === 'common') {
      const { file1, file2 } = currentData;
      const firstValue = getValue(file1, depth);
      const secondValue = getValue(file2, depth);
      return `${lowerIndent}+ ${keyName}: ${firstValue}\n${lowerIndent}- ${keyName}: ${secondValue}`;
    }
    if (type === 'firstFile') {
      const { file1 } = currentData;
      const firstValue = getValue(file1, depth);
      return `${lowerIndent}+ ${keyName}: ${firstValue}`
    }
    if (type === 'secondFile') {
      const { file2 } = currentData;
      const secondValue = getValue(file2, depth);
      return `${lowerIndent}+ ${keyName}: ${secondValue}`
    }
  };

  const formatedData = Object.entries(data).map(([key, val]) => iter(val, 1, key)).join('\n');
  return `{\n${formatedData}\n}`;
}

export default stylish;