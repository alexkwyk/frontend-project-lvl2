import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case 'json': return JSON.parse(file);
    case ('yml' || 'yaml'): return yaml.load(file);
    default: throw Error(`Invalid file format ${format}`);
  }
};

export default parse;
