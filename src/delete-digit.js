const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const str = n + ``;
  const num = Math.min(...str);
  
  return Math.max(str.replace(`${str[0]}`, ``), str.replace(`${num}`, ``));
}

module.exports = {
  deleteDigit
};
