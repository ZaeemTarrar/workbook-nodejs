const Pipes: Function = async (IO: any, server: any): Promise<any> => {
	IO.on('connection', (socket: any) => {
		console.log('Socket: ', socket);
		IO.on('destroy', (data: any) => {
			console.log('Socket End: ', data);
		});
	});
};

module.exports = Pipes;
