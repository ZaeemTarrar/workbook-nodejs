module.exports.AssertionError = (err: Error | any): boolean => {
	return err.code === 'ERR_ASSERTION';
};

module.exports.JwtTokenError = (err: Error | any): boolean => {
	return err.name === 'TokenExpiredError';
};
