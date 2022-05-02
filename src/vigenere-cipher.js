const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this._alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    this._TABULA_RECTA = [];
    
    for (let i = 0; i < this._alphabet.length; i++) {
      this._TABULA_RECTA[i] = this._alphabet.slice(i).concat(this._alphabet.slice(0, i));
    }
  }
  
  encrypt(message, key) {
    if (!message || !key) throw new Error(`Incorrect arguments!`);
    
    message = message.toUpperCase();
    key = key.repeat(message.length / key.length + 1).toUpperCase();
    let str = ``;
    
    for (let i = 0; i < message.length; i++) {
      let row = this._alphabet.indexOf(message[i]);
      let col = this._alphabet.indexOf(key[i]);
      if (row !== -1 && col !== -1) {
        str += this._TABULA_RECTA[row][col];
      } else {
        str+= message[i];
        message = message.replace(message[i], ``);
        i--;
      }
    }
    
    return this.direct ? str : str.split(``).reverse().join(``);
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error(`Incorrect arguments!`);
    
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.repeat(encryptedMessage.length / key.length + 1).toUpperCase();
    
    let str = ``;
    for (let i = 0; i < encryptedMessage.length; i++) {
      const row = this._alphabet.indexOf(key[i]);
      const col = this._TABULA_RECTA[row].indexOf(encryptedMessage[i]);

      if (col !== -1) {
        str += this._alphabet[col];
      } else {
        str += encryptedMessage[i];
        key = key.substring(0, i) + encryptedMessage[i] + key.substring(i, encryptedMessage.length);
      }
    }
 
    return this.direct ? str : str.split(``).reverse().join(``);
  }
}

module.exports = {
  VigenereCipheringMachine
};
