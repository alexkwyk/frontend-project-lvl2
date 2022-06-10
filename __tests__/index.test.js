import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import readFile from '../src/utilities/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fixtures = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['file1.json', 'file2.yml'],
  ['file1.yml', 'file2.yml'],
];

const wrongFixtures = [
  ['exceptedStylish.txt', 'file2.json'],
  ['file1.yml', 'exceptedStylish.txt'],
  ['file1.json', 'exceptedJson.txt'],
  ['exceptedPlain.txt', 'file2.yml'],
];
test.each(fixtures)('stylish: %s, %s', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const expected = readFile(getFilePath('exceptedStylish.txt'));
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test.each(fixtures)('plain: %s, %s', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const expected = readFile(getFilePath('exceptedPlain.txt'));
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
});

test.each(fixtures)('json: %s, %s', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  const expected = readFile(getFilePath('exceptedJson.txt'));
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expected);
});

test.each(wrongFixtures)('wrong file formats: %s, %s', (file1, file2) => {
  const filepath1 = getFilePath(file1);
  const filepath2 = getFilePath(file2);
  expect(genDiff(filepath1, filepath2, 'stylish')).toMatch('Unsupported file format');
});
