import yaml from 'js-yaml';

const parse = (file, extension) => {
  if (extension === 'json') return JSON.parse(file);
  if (extension === ('yml' || 'yaml')) return yaml.load(file);
  return Error(`Invalid file format ${extension}`);
};

export default parse;
