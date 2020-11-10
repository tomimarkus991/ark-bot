import difference from "./difference";

const areSame = (array1: any, array2: any) => {
  if (JSON.stringify(array1) === JSON.stringify(array2)) {
    return "no changes";
  } else {
    return difference(array1, array2);
  }
};

export default areSame;
