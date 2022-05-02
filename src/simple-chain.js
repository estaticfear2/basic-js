const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  data: [],
  getLength() {
    return this.data.length;
  },
  addLink(value) {
    value === null ? this.data.push(`null`) : this.data.push(value);

    return this;
  },
  removeLink(position) {
    if (this.data[position - 1] === undefined) {
      this.data = [];
      throw new Error(`You can't remove incorrect link!`);
    }
    this.data.splice(position - 1, 1);

    return this;
  },
  reverseChain() {
    this.data.reverse();

    return this;
  },
  finishChain() {
    const data = `( ${this.data.join(' )~~( ')} )`;
    
    this.data = [];
    return data;
  }
};

module.exports = {
  chainMaker
};
