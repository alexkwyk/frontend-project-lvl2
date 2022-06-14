import _ from 'lodash';

const stringify = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return (typeof item === 'string') ? `'${item}'` : item;
};

const makeOutput = (node, path) => {
  switch (node.type) {
    case 'nested': return node.children
      .flatMap((item) => makeOutput(item, `${path}.${item.key}`))
      .join('\n');
    case 'added':
      return `Property '${path}' was added with value: ${stringify(node.value)}`;
    case 'changed':
      return `Property '${path}' was updated. From ${stringify(node.removedValue)} to ${stringify(node.addedValue)}`;
    case 'removed':
      return `Property '${path}' was removed`;
    default:
      return [];
  }
};

const plain = (differenceTree) => differenceTree
  .map((item) => makeOutput(item, item.key))
  .join('\n');

export default plain;
