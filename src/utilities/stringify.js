import _ from 'lodash'

const stringify = (values, baseDepth = 1, replacer = '  ', spacesCount = 2) => {
  const iter = (data, depth) => {
    if (_.isObject(data)) {
      const space = replacer.repeat(spacesCount * depth);
      const lowerSpace = replacer.repeat(spacesCount * (depth - 1));
      const result = Object.entries(data)
        .map(([key, value]) => (typeof value === 'object') ?
          `${space}${key}: ${iter(value, depth + 1)}` :
            `${space}${key}: ${value}`)
        .join('\n');
      return `{\n${result}\n${lowerSpace}}`;
    }
    return (data === null)? null : data.toString();
  };
  return iter(values, baseDepth);
};

export default stringify;