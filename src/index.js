import _ from 'lodash';
import path from 'path';
import formatDiff from './formatters/index.js';
import parse from './utilities/parsers.js';
import readFile from './utilities/readFile.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.reduce((acc, key) => {
    const hasKey1 = _.has(data1, key);
    const hasKey2 = _.has(data2, key);
    const value1 = data1?.[key];
    const value2 = data2?.[key];
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

const getExtName = (filepath) => path.extname(path.basename(filepath)).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parse(readFile(filepath1), getExtName(filepath1));
  const parsedFile2 = parse(readFile(filepath2), getExtName(filepath2));
  const differenceTree = buildDiff(parsedFile1, parsedFile2);
  return formatDiff(differenceTree, format);
};

export default genDiff;
