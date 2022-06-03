import stylish from "./stylish.js";

export default (data, format) => {
  switch (format) {
    case 'stylish': return stylish(data);
    default: return `Invalid format output: "${format}"\nAvailable output options:\n  stylish`;
  }
}