import path from 'path';
import buildTree from './buildTree.js';
import formatDiff from './formatters/index.js';
import parse from './utilities/parsers.js';
import readFile from './utilities/readFile.js';

const getExtName = (filepath) => path.extname(path.basename(filepath)).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const extension1 = getExtName(filepath1);
  const extension2 = getExtName(filepath2);
  const parsedFile1 = parse(file1, extension1);
  const parsedFile2 = parse(file2, extension2);
  const diffTree = buildTree(parsedFile1, parsedFile2);
  return formatDiff(diffTree, format);
};

export default genDiff;
