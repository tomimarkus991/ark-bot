const difference = (_array1: [], _array2: []) => {
  const result: any = {};

  // if the objects are same return undefiened
  if (Object.is(_array1, _array2)) {
    return undefined;
  }

  if (!_array2 || typeof _array2 !== "object") {
    return _array2;
  }

  Object.keys(_array1 || {})
    .concat(Object.keys(_array2 || {}))
    .forEach((key: any) => {
      if (
        _array2[key] !== _array1[key] &&
        !Object.is(_array1[key], _array2[key])
      ) {
        result[key] = _array2[key];
      }
      if (
        typeof _array2[key] === "object" &&
        typeof _array1[key] === "object"
      ) {
        const value = difference(_array1[key], _array2[key]);
        if (value !== undefined) {
          result[key] = value;
        }
      }
    });
  return result;
};

export default difference;
