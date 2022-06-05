import _ from 'lodash'

const stringify = (values, baseDepth = 1, replacer = '  ', spacesCount = 2) => {
  const iter = (data, depth) => {
    if (_.isObject(data)) {
      const dataEntries = Object.entries(data);
      const space = replacer.repeat(spacesCount * depth);
      const lowerSpace = replacer.repeat(spacesCount * (depth - 1));
      const dataString = dataEntries.map((item) => {
        const [key, value] = item;
        if (typeof value === 'object') {
          return `${space}${key}: ${iter(value, depth + 1)}`;
        }
        return `${space}${key}: ${value}`;
      });
      const result = `${dataString.join('\n')}`;
      return `{\n${result}\n${lowerSpace}}`;
    }
    return (data === null)? null : data.toString();
  };
  return iter(values, baseDepth);
};

export default stringify;