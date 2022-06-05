import plain from "./plain.js";
import stylish from "./stylish.js";

export default (data, format) => {
  switch (format) {
    case 'stylish': return stylish(data);
    case 'plain': return plain(data);
    default: return `Invalid format output: "${format}"\nAvailable output options:\n  stylish`;
  }
}