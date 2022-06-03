import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../index.js';
import readFile from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
 
test('stylish .json/.json', () => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.json');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('stylish .yaml/.yaml',() => {
  const file1 = getFilePath('file1.yml');
  const file2 = getFilePath('file2.yml');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('stylish .json/.yaml',() => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.yml');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('stylish .yaml/.json',() => {
  const file1 = getFilePath('file1.yml');
  const file2 = getFilePath('file2.json');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1, file2)).toEqual(expected);
});