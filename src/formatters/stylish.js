import _ from 'lodash'
import stringify from '../utilities/stringify.js';

const getValue = (item, depth) => (_.isObject(item)) ? stringify(item, depth + 1) : item;

const stylish = (differenceTree) => {
  const iter = (currentData, depth, parent) => {
    const { type } = currentData;
    const indent = '  '.repeat(2 * depth);
    const lowerIndent = '  '.repeat(2 * depth - 1);
    if (type === 'object') {
      const { value } = currentData;
      const currentEntries = Object.entries(value);
      const dataString = currentEntries.map(([key, value]) => {
        return `${iter(value, depth + 1, key)}`;
      });
      const result = `${dataString.join('\n')}`;
      return `${indent}${parent}: {\n${result}\n${indent}}`;
    } 
    else if (type === 'equal') {
      const { value } = currentData;
      return `${indent}${parent}: ${value}`
    } 
    else if (type === 'common') {
      const { file1, file2 } = currentData;
      const firstValue = getValue(file1, depth);
      const secondValue = getValue(file2, depth);
      return `${lowerIndent}- ${parent}: ${firstValue}\n${lowerIndent}+ ${parent}: ${secondValue}`;
    } 
    else if (type === 'firstFile') {
      const { file1 } = currentData;
      const firstValue = getValue(file1, depth);
      return `${lowerIndent}- ${parent}: ${firstValue}`
    } 
    else if (type === 'secondFile') {
      const { file2 } = currentData;
      const secondValue = getValue(file2, depth);
      return `${lowerIndent}+ ${parent}: ${secondValue}`
    }
    const formatedData = Object.entries(currentData).map(([key, val]) => iter(val, 1, key)).join('\n');
    return `{\n${formatedData}\n}`;
  };
  return iter(differenceTree);
}

export default stylish;