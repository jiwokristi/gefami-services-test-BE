// Soal no. 7

const SHA256 = require('crypto-js/sha256')

function generateHash(input) {
  return SHA256(input).toString()
}

const inputString = '01112018kenpriaifabula'
const hash = generateHash(inputString)
console.log('Hash:', hash)
