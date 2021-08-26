/**
 * Message Methods
 */
module.exports.notGiven = (item: string, collection: string | null) => {
	if (collection) return `${collection} '${item}' is not provided`;
	else return `'${item}' is not provided`;
};

module.exports.cantUpdate = (item: string) => {
	return `Can not update '${item}'`;
};
