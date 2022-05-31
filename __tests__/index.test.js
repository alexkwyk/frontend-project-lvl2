import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFilePath('file1.json');
const file2 = getFilePath('file2.json');
const expectedString = '{\n  - proxy: 123.234.53.22\n  - follow: false\n  host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  + verbose: true \n}'

test('JSON files',() => {
  expect(genDiff(file1, file2)).toEqual(expectedString);
});