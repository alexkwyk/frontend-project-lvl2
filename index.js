import _ from 'lodash'
import formatDiff from './src/formatters/index.js';
import parse from './src/utilities/parsers.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parse(filepath1);
  const parsedFile2 = parse(filepath2);

  const calcDiff = (firstObj, secondObj) => {
    const uniqueKeys = _.uniq([...Object.keys(firstObj), ...Object.keys(secondObj)])
      .sort();
    return uniqueKeys.reduce((acc, key) => {
      const hasKey1 = _.has(firstObj, key);
      const hasKey2 = _.has(secondObj, key);
      const value1 = firstObj?.[key];
      const value2 = secondObj?.[key];
      if (hasKey1 === hasKey2) {
        if (_.isObject(value1) && _.isObject(value2)) {
          return { ...acc, [key]: { type: 'object', children: calcDiff(value1, value2) } };
        }
        if (value1 === value2) {
          return { ...acc, [key]: { type: 'equal', value: value1 }};
        }
        return { ...acc, [key]: { type: 'common', file1: value1, file2: value2 }};
      } 
      if (hasKey1) { 
        return { ...acc, [key]: { type: 'firstFile', file1: value1 }}
      } 
      if (hasKey2) {
        return { ...acc, [key]: { type: 'secondFile', file2: value2 }}
      }
      return acc;
    }, {});
  };
  const diffTree = calcDiff(parsedFile1, parsedFile2);
  return formatDiff(diffTree, format);
}

export default genDiff;