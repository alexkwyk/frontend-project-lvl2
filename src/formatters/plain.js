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
      .reduce((acc, item) => {
        const currentPath = `${path}.${item.key}`;
        const currentOutput = makeOutput(item, currentPath);
        return (currentOutput === null) ? acc : [...acc, currentOutput];
      }, [])
      .join('\n');
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${path}' was updated. From ${stringify(node.removedValue)} to ${stringify(node.addedValue)}`;
    case 'removed':
      return `Property '${path}' was removed`;
    case 'added':
      return `Property '${path}' was added with value: ${stringify(node.value)}`;
    default:
      return Error(`Invalid type: ${node.type} of key: ${path} in unformated difference tree`);
  }
};

const plain = (differenceTree) => differenceTree
  .map((item) => makeOutput(item, item.key))
  .join('\n');

export default plain;
