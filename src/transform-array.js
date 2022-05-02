const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error (`'arr' parameter must be an instance of the Array!`);

  let ar = arr.slice();
  
  ar.forEach((it, i) => {
    if (typeof it === `string`) {
      switch (it) {
        case "--discard-prev":
          ar[i] = null;
          if (i !== 0) {
          	ar[i - 1] = null;
          } 
          break;
        case "--discard-next":
          ar[i] = null;
          if (i !== ar.length - 1) {
            ar[i + 1] = null;
          }
          break;
        case "--double-prev":
          if (i !== 0) {
            ar[i] = ar[i - 1];
          } else ar[i] = null;
          break;
        case "--double-next":
          if (i !== ar.length - 1) {
            ar[i] = ar[i + 1];
          } else ar[i] = null;
          break;
        default:
          break;
      }
    }
  });

  return ar.filter(it => it !== null);
}

module.exports = {
  transform
};
