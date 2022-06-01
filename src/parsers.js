import readFile from './utils.js';
import * as path from 'node:path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const fileName = path.basename(filepath);
  const extName = path.extname(fileName);
  const file = readFile(filepath);
  switch (extName) {
    case '.json': return JSON.parse(file);
    case ('.yml' || '.yaml'): return yaml.load(file);
    default: return Error('Invalid file format');
  }
};

export default parse;