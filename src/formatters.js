import _ from 'lodash'

const stringify = (values, baseDepth, replacer = '  ', spacesCount = 2) => {
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
    return data.toString();
  };
  return iter(values, baseDepth);
};

const stylishFormat = (data) => {
  const iter = (currentData, depth, keyName) => {
    const { type } = currentData;
    const indent = '  '.repeat(2 * depth);
    const lowerIndent = '  '.repeat(2 * depth - 1);
    if (type === 'object') {
      const { value } = currentData;
      const currentEntries = Object.entries(value);
      const dataString = currentEntries.map((item) => {
        const [key, value] = item;
        return `${iter(value, depth + 1, key)}`;
      });
      const result = `${dataString.join('\n')}`;
      return `${indent}${keyName}: {\n${result}\n${indent}}`;
    }
    if (type === 'equal') {
      const { value } = currentData;
      return `${indent}${keyName}: ${value}`
    }
    if (type === 'common') {
      const { file1, file2 } = currentData;
      const file1String = (_.isObject(file1)) ? stringify(file1, depth + 1) : file1;
      const file2String = (_.isObject(file2)) ? stringify(file2, depth + 1) : file2;
      return `${lowerIndent}+ ${keyName}: ${file1String}\n${lowerIndent}- ${keyName}: ${file2String}`;
    }
    if (type === 'firstFile') {
      const { file1 } = currentData;
      const file1String = (_.isObject(file1)) ? stringify(file1, depth + 1) : file1;
      return `${lowerIndent}+ ${keyName}: ${file1String}`
    }
    if (type === 'secondFile') {
      const { file2 } = currentData;
      const file2String = (_.isObject(file2)) ? stringify(file2, depth + 1) : file2;
      return `${lowerIndent}+ ${keyName}: ${file2String}`
    }
  };

  const dataArray = Object.entries(data);
  const formatedData = dataArray.map(([key, val]) => iter(val, 1, key)).join('\n');
  return `{\n${formatedData}\n}`;
}

export default stylishFormat;