import Difference from './difference';

const AreSame = (array1: any, array2: any) => {
  if (JSON.stringify(array1) === JSON.stringify(array2)) {
    return 'no changes';
  } else {
    return Difference(array1, array2);
  }
};

export default AreSame;
