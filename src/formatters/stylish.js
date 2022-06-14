import _ from 'lodash';

const stringify = (data, depth) => {
  if (_.isObject(data)) {
    const space = '  '.repeat(2 * depth);
    const lowerSpace = '  '.repeat(2 * (depth - 1));
    const result = Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === 'object') {
          return `${space}${key}: ${stringify(value, depth + 1)}`;
        }
        return `${space}${key}: ${value}`;
      })
      .join('\n');
    return `{\n${result}\n${lowerSpace}}`;
  }
  return (data === null) ? null : data.toString();
};

const makeOutput = (node, depth = 1) => {
  const indent = '  '.repeat(2 * depth);
  const lowerIndent = '  '.repeat(2 * depth - 1);
  switch (node.type) {
    case 'nested': {
      const newChildren = node.children
        .map((item) => makeOutput(item, depth + 1))
        .join('\n');
      return `${indent}${node.key}: {\n${newChildren}\n${indent}}`;
    }
    case 'unchanged':
      return `${indent}${node.key}: ${node.value}`;
    case 'changed':
      return `${lowerIndent}- ${node.key}: ${stringify(node.removedValue, depth + 1)}\n${lowerIndent}+ ${node.key}: ${stringify(node.addedValue, depth + 1)}`;
    case 'removed':
      return `${lowerIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
    default:
      return `${lowerIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
  }
};

const stylish = (differenceTree) => {
  const result = differenceTree
    .map((item) => makeOutput(item))
    .join('\n');
  return `{\n${result}\n}`;
};

export default stylish;
