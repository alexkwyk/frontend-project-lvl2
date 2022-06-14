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
  ['file1.json', 'file2.json', 'json'],
  ['file1.yml', 'file2.yml', 'json'],
  ['file1.json', 'file2.yml', 'json'],
  ['file1.yml', 'file2.yml', 'json'],
];

describe('positive tests', () => {
  test.each(fixtures)('Files: %s, %s. Output format: %s', (file1, file2, format) => {
    const filepath1 = getFilePath(file1);
    const filepath2 = getFilePath(file2);
    const excepted = readFile(getFilePath(`${format}.txt`));
    expect(genDiff(filepath1, filepath2, format)).toBe(excepted);
  });
});

describe('negative tests', () => {
  test('wrong file format', () => {
    const filepath1 = getFilePath('stylish.txt');
    const filepath2 = getFilePath('file2.json');
    expect(() => genDiff(filepath1, filepath2)).toThrow();
  });
  test('wrong output format', () => {
    const filepath1 = getFilePath('file1.json');
    const filepath2 = getFilePath('file2.json');
    expect(() => genDiff(filepath1, filepath2, 'null')).toThrow();
  });
});
