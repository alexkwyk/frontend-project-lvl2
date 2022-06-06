import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

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
