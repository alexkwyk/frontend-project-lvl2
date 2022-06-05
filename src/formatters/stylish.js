import _ from 'lodash'
import stringify from '../utilities/stringify.js';

const getValue = (item, depth) => (_.isObject(item)) ? stringify(item, depth + 1) : item;

const stylish = (differenceTree) => {
  const iter = (currentData, depth, parent) => {
    const indent = '  '.repeat(2 * depth);
    const lowerIndent = '  '.repeat(2 * depth - 1);
    switch (currentData.type) {
      case 'object': {
        const { children } = currentData;
        const result = Object.entries(children)
          .map(([key, value]) => `${iter(value, depth + 1, key)}`)
          .join('\n');
        return `${indent}${parent}: {\n${result}\n${indent}}`;
      } 
      case 'equal': {
        const { value } = currentData;
        return `${indent}${parent}: ${value}`
      } 
      case 'common': {
        const { file1, file2 } = currentData;
        return `${lowerIndent}- ${parent}: ${getValue(file1, depth)}\n${lowerIndent}+ ${parent}: ${getValue(file2, depth)}`;
      } 
      case 'firstFile': {
        const { file1 } = currentData;
        return `${lowerIndent}- ${parent}: ${getValue(file1, depth)}`
      } 
      case 'secondFile': {
        const { file2 } = currentData;
        return `${lowerIndent}+ ${parent}: ${getValue(file2, depth)}`
      }
      default: {
        const formatedData = Object.entries(currentData)
          .map(([key, val]) => iter(val, 1, key))
          .join('\n');
        return `{\n${formatedData}\n}`;
      }
    }
  };
  return iter(differenceTree);
}

export default stylish;