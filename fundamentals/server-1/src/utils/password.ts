const bcrypt = require('bcrypt');
const { EncryptionSalt } = require('./../configurations/index');

const GenerateHash = (password: string): Promise<string> => {
	return bcrypt.hash(password, bcrypt.genSaltSync(EncryptionSalt));
};

const ValidPassword = (stringPassword: string, encryptedPassword: string): boolean => {
	return bcrypt.compareSync(stringPassword, encryptedPassword);
};

module.exports = {
	GenerateHash,
	ValidPassword
};
