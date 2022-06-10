import _ from 'lodash';
import path from 'path';
import formatDiff from './formatters/index.js';
import parse from './utilities/parsers.js';
import readFile from './utilities/readFile.js';

const buildDiffTree = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys.map((key) => {
    const value1 = data1?.[key];
    const value2 = data2?.[key];
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, type: 'nested', children: buildDiffTree(value1, value2) };
      }
      if (value1 === value2) {
        return { key, type: 'unchanged', value: value1 };
      }
      return {
        key, type: 'updated', removedValue: value1, addedValue: value2,
      };
    }
    if (_.has(data1, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.has(data2, key)) {
      return { key, type: 'added', value: value2 };
    }
    return Error(`Cannot find ${key} while build unformatted difference tree`);
  });
};

const getExtName = (filepath) => path.extname(path.basename(filepath)).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parse(readFile(filepath1), getExtName(filepath1));
  const parsedFile2 = parse(readFile(filepath2), getExtName(filepath2));
  const diffTree = buildDiffTree(parsedFile1, parsedFile2);
  return formatDiff(diffTree, format);
};

export default genDiff;
