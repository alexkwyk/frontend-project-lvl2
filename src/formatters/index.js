import plain from './plain.js';
import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish': return stylish(data);
    case 'plain': return plain(data);
    case 'json': return JSON.stringify(data);
    default: throw Error(`Invalid format output: "${format}". Available output options: stylish, plain, json.`);
  }
};
