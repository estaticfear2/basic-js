const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const arr = [...new Set(str.split(``))];

  arr.forEach(it => {
    const regexp = new RegExp(`[${it}]{1,}`, `g`);
    str = str.replace(regexp, match => {
      return match.length > 1 ? `${match.length}${match[0]}` : match[0];
    });
  });

  return str;
}

module.exports = {
  encodeLine
};
