import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../src/index.js';
import readFile from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
 
test('JSON files', () => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.json');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

//test('YAML files',() => {
  //const file1 = getFilePath('file1.yml');
  //const file2 = getFilePath('file2.yml');
  //expect(genDiff(file1yml, file2yml)).toEqual(expectedString);
//});