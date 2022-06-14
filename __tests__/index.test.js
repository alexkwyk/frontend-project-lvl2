import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import readFile from '../src/utilities/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fixtures = [
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylish'],
  ['file1.json', 'file2.yml', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylish'],
  ['file1.json', 'file2.json', 'plain'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.json', 'file2.yml', 'plain'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.json', 'file2.json', 'plain'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.json', 'file2.yml', 'plain'],
  ['file1.yml', 'file2.yml', 'plain'],
];

const wrongFixtures = [
  ['exceptedStylish.txt', 'file2.json'],
  ['file1.yml', 'exceptedStylish.txt'],
  ['file1.json', 'exceptedJson.txt'],
  ['exceptedPlain.txt', 'file2.yml'],
];

describe('positive tests', () => {
  test.each(fixtures)('files: %s %s, format: %s', (file1, file2, format) => {
    const filepath1 = getFilePath(file1);
    const filepath2 = getFilePath(file2);
    expect(genDiff(filepath1, filepath2, format)).toBe(readFile(getFilePath(`${format}.txt`)));
  });
});

describe('negative tests', () => {
  test.each(wrongFixtures)('wrong file formats: %s, %s', (file1, file2) => {
    const filepath1 = getFilePath(file1);
    const filepath2 = getFilePath(file2);
    expect(() => genDiff(filepath1, filepath2, 'stylish')).toThrow();
  });
  test.each(fixtures)('wrong choose format type: %s, %s', (file1, file2) => {
    const filepath1 = getFilePath(file1);
    const filepath2 = getFilePath(file2);
    expect(() => genDiff(filepath1, filepath2, 'stylis')).toThrow();
  });
});
