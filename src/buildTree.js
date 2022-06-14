import _ from 'lodash';

const buildTree = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys.map((key) => {
    const value1 = data1?.[key];
    const value2 = data2?.[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.has(data2, key) && !_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildTree(value1, value2) };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key, type: 'changed', removedValue: value1, addedValue: value2,
    };
  });
};

export default buildTree;
