import _ from 'lodash';

const getValue = (item) => {
  if (_.isObject(item)) return '[complex value]';
  return (typeof item === 'string') ? `'${item}'` : item;
};

const plain = (differenceTree) => {
  const iter = (currentData, path) => {
    switch (currentData.type) {
      case 'object': return Object.entries(currentData.children)
        .reduce((acc, [key, value]) => {
          const currentPath = `${path}.${key}`;
          const currentOutput = iter(value, currentPath);
          if (currentOutput !== undefined) {
            return [...acc, currentOutput];
          }
          return acc;
        }, [])
        .join('\n');
      case 'equal': return undefined;
      case 'common': {
        const { file1, file2 } = currentData;
        return `Property '${path}' was updated. From ${getValue(file1)} to ${getValue(file2)}`;
      }
      case 'firstFile': return `Property '${path}' was removed`;
      case 'secondFile': {
        const { file2 } = currentData;
        return `Property '${path}' was added with value: ${getValue(file2)}`;
      }
      default: return Object.entries(currentData)
        .map(([key, val]) => iter(val, key))
        .filter((item) => item !== undefined)
        .join('\n');
    }
  };

  return iter(differenceTree);
};

export default plain;
