import _ from 'lodash';

const stringify = (values, baseDepth = 1, replacer = '  ', spacesCount = 2) => {
  const iter = (data, depth) => {
    if (_.isObject(data)) {
      const space = replacer.repeat(spacesCount * depth);
      const lowerSpace = replacer.repeat(spacesCount * (depth - 1));
      const result = Object.entries(data)
        .map(([key, value]) => {
          if (typeof value === 'object') {
            return `${space}${key}: ${iter(value, depth + 1)}`;
          }
          return `${space}${key}: ${value}`;
        })
        .join('\n');
      return `{\n${result}\n${lowerSpace}}`;
    }
    return (data === null) ? null : data.toString();
  };
  return iter(values, baseDepth);
};

const getValue = (item, depth) => ((_.isObject(item)) ? stringify(item, depth + 1) : item);

const makeOutput = (node, parent, depth = 1) => {
  const indent = '  '.repeat(2 * depth);
  const lowerIndent = '  '.repeat(2 * depth - 1);
  switch (node.type) {
    case 'object': {
      const newChildren = Object.entries(node.children)
        .map(([key, value]) => makeOutput(value, key, depth + 1))
        .join('\n');
      return `${indent}${parent}: {\n${newChildren}\n${indent}}`;
    }
    case 'equal':
      return `${indent}${parent}: ${node.value}`;
    case 'common':
      return `${lowerIndent}- ${parent}: ${getValue(node.file1, depth)}\n${lowerIndent}+ ${parent}: ${getValue(node.file2, depth)}`;
    case 'firstFile':
      return `${lowerIndent}- ${parent}: ${getValue(node.file1, depth)}`;
    case 'secondFile':
      return `${lowerIndent}+ ${parent}: ${getValue(node.file2, depth)}`;
    default:
      return Error(`Invalid type: ${node.type} of key: ${parent} in unformated difference tree`);
  }
};

const stylish = (differenceTree) => {
  const result = Object.entries(differenceTree)
    .map(([key, val]) => makeOutput(val, key))
    .join('\n');
  return `{\n${result}\n}`;
};

export default stylish;
