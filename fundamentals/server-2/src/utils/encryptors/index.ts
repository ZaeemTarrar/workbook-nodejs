const bcrypt: any = require('bcrypt');
const Configurations: any = require('./../../configurations/index');
const { Encryption }: any = Configurations;

const GenerateHash: Function = async (password: string): Promise<any> =>
	await bcrypt.hash(password, await bcrypt.genSaltSync(Encryption.Salt));

const ValidPassword: Function = async (stringPassword: string, encryptedPassword: string): Promise<any> =>
	await bcrypt.compare(stringPassword, encryptedPassword);

module.exports = {
	GenerateHash,
	ValidPassword
};
