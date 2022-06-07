import _ from 'lodash';
import path from 'path';
import formatDiff from './formatters/index.js';
import parse from './utilities/parsers.js';
import readFile from './utilities/readFile.js';

const buildDiff = (firstObj, secondObj) => {
  const uniqueKeys = _.uniq([...Object.keys(firstObj), ...Object.keys(secondObj)]);
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.reduce((acc, key) => {
    const hasKey1 = _.has(firstObj, key);
    const hasKey2 = _.has(secondObj, key);
    const value1 = firstObj?.[key];
    const value2 = secondObj?.[key];
    if (hasKey1 === hasKey2) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return { ...acc, [key]: { type: 'object', children: buildDiff(value1, value2) } };
      }
      if (value1 === value2) {
        return { ...acc, [key]: { type: 'equal', value: value1 } };
      }
      return { ...acc, [key]: { type: 'common', file1: value1, file2: value2 } };
    }
    if (hasKey1) {
      return { ...acc, [key]: { type: 'firstFile', file1: value1 } };
    }
    if (hasKey2) {
      return { ...acc, [key]: { type: 'secondFile', file2: value2 } };
    }
    return acc;
  }, {});
};

const getExtName = (filepath) => path.extname(path.basename(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parse(readFile(filepath1), getExtName(filepath1));
  const parsedFile2 = parse(readFile(filepath2), getExtName(filepath2));
  const differenceTree = buildDiff(parsedFile1, parsedFile2);
  return formatDiff(differenceTree, format);
};

export default genDiff;
