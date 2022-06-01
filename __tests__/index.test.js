import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1json = getFilePath('file1.json');
const file2json = getFilePath('file2.json');
const file1yml = getFilePath('file1.yml');
const file2yml = getFilePath('file2.yml');
const expectedString = '{\n  - proxy: 123.234.53.22\n  - follow: false\n  host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  + verbose: true \n}';

test('JSON files',() => {
  expect(genDiff(file1json, file2json)).toEqual(expectedString);
});

test('YAML files',() => {
  expect(genDiff(file1yml, file2yml)).toEqual(expectedString);
});