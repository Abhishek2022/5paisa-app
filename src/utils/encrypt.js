const CryptoJS = require('crypto-js')

const byteArrayToWordArray = (ba) => {
  let wa = [],
    i
  for (i = 0; i < ba.length; i++) {
    wa[(i / 4) | 0] |= ba[i] << (24 - 8 * i)
  }

  return CryptoJS.lib.WordArray.create(wa, ba.length)
}

const addExtraByteToChars = (str) => {
  str = str.toString()

  let strResult = ''
  for (let i = 0; i < str.length; ++i) {
    strResult = strResult + str.charAt(i) + String.fromCharCode(0)
  }
  return strResult
}

const enc = (str) => {
  let strPadded = addExtraByteToChars(str)

  let keyBytes = CryptoJS.PBKDF2(
    'h8jePAOhTdeZeMKW0i0LAQFzCU3XOEDdyvjMV0xTLnKejtRD5oAJPO7MSXrM3EAM',
    new CryptoJS.lib.WordArray.init(byteArrayToWordArray([83,71, 26, 58, 54, 35, 22, 11, 83, 71, 26, 58, 54, 35, 22, 11]).words, 16),
    {
      keySize: 12,
      iterations: 1000
    }
  )

  let iv = new CryptoJS.lib.WordArray.init(keyBytes.words, 16)
  let key = new CryptoJS.lib.WordArray.init(keyBytes.words.splice(4), 32)
  let encrypted = CryptoJS.AES.encrypt(str, key, {iv})

  return encrypted.toString()
}

module.exports = enc