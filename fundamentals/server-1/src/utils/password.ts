const { bcrypt } = require('bcrypt-nodejs')
const { EncryptionSalt } = require('./../configurations/index')

export const GenerateHash = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(EncryptionSalt), null)
}

export const ValidPassword = (
  stringPassword: string,
  encryptedPassword: string,
): boolean => {
  return bcrypt.compareSync(stringPassword, encryptedPassword)
}
