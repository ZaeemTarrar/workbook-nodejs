module.exports.ForgetPasswordEmail = (resetUrl: string) => {
	const message = `
			<h1> You have Requested a Password Reset </h1>
			<p> Please go to this Link to Reset Password </p>
			<a href=${resetUrl} clicktracking=off >${resetUrl}</a>
		`;
	const subject: string = 'Reset Password';
	return { message, subject };
};
