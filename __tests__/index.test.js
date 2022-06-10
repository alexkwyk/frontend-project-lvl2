import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import readFile from '../src/utilities/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish format', () => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(file1json, file2json)).toBe(expected);
  expect(genDiff(file1yml, file2yml)).toBe(expected);
  expect(genDiff(file1json, file2yml)).toBe(expected);
  expect(genDiff(file1yml, file2json)).toBe(expected);
});

test('plain format', () => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');
  const expected = readFile(getFilePath('exceptedPlain.txt'));
  expect(genDiff(file1json, file2json, 'plain')).toBe(expected);
  expect(genDiff(file1yml, file2yml, 'plain')).toBe(expected);
  expect(genDiff(file1json, file2yml, 'plain')).toBe(expected);
  expect(genDiff(file1yml, file2json, 'plain')).toBe(expected);
});

test('json format', () => {
  const file1json = getFilePath('file1.json');
  const file2json = getFilePath('file2.json');
  const file1yml = getFilePath('file1.yml');
  const file2yml = getFilePath('file2.yml');
  const expected = readFile(getFilePath('exceptedJson.txt'));
  expect(genDiff(file1json, file2json, 'json')).toBe(expected);
  expect(genDiff(file1yml, file2yml, 'json')).toBe(expected);
  expect(genDiff(file1json, file2yml, 'json')).toBe(expected);
  expect(genDiff(file1yml, file2json, 'json')).toBe(expected);
});
