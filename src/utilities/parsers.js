import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case 'json': return JSON.parse(file);
    case ('yml' || 'yaml'): return yaml.load(file);
    default: throw Error(`Invalid file extenstion: ${format}. Supported file extensions: json, yml, yaml.`);
  }
};

export default parse;
