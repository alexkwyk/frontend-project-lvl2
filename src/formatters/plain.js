import _ from 'lodash'

const getValue = (item) => {
  if (_.isObject(item)) return '[complex value]';
  return (typeof item === 'string') ? `'${item}'` : item;
}

const plain = (differenceTree) => {
  const iter = (currentData, path) => {
    const { type } = currentData;
    if (type === 'object') {
      const { children } = currentData;
      const currentEntries = Object.entries(children);
      const dataArray = currentEntries.reduce((acc, [key, value]) => {
        const currentPath = `${path}.${key}`;
        const currentOutput = iter(value, currentPath);
        if (currentOutput !== undefined) { 
          acc.push(currentOutput);
        }
        return acc;
      }, []);
      return `${dataArray.join('\n')}`;
    } 
    else if (type === 'equal') {
      return;
    }
    else if (type === 'common') {
      const { file1, file2 } = currentData;
      return `Property '${path}' was updated. From ${getValue(file1)} to ${getValue(file2)}`;
    } 
    else if (type === 'firstFile') {
      return `Property '${path}' was removed`
    } 
    else if (type === 'secondFile') {
      const { file2 } = currentData;
      return `Property '${path}' was added with value: ${getValue(file2)}`
    }
    const formatedData = Object.entries(currentData).map(([key, val]) => iter(val, key))
      .filter((item) => item !== undefined)
      .join('\n');
    return formatedData;
  };

  return iter(differenceTree)
}

export default plain;