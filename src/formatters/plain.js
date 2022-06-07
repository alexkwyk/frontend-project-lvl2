import _ from 'lodash';

const getValue = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return (typeof item === 'string') ? `'${item}'` : item;
};

const makeOutput = (node, path) => {
  switch (node.type) {
    case 'object': return Object.entries(node.children)
      .reduce((acc, [key, value]) => {
        const currentPath = `${path}.${key}`;
        const currentOutput = makeOutput(value, currentPath);
        return (currentOutput === null) ? acc : [...acc, currentOutput];
      }, [])
      .join('\n');
    case 'equal':
      return null;
    case 'common':
      return `Property '${path}' was updated. From ${getValue(node.file1)} to ${getValue(node.file2)}`;
    case 'firstFile':
      return `Property '${path}' was removed`;
    case 'secondFile':
      return `Property '${path}' was added with value: ${getValue(node.file2)}`;
    default:
      return Error(`Invalid type: ${node.type} of key: ${path} in unformated difference tree`);
  }
};

const plain = (differenceTree) => Object.entries(differenceTree)
  .map(([key, val]) => makeOutput(val, key))
  .join('\n');

export default plain;
