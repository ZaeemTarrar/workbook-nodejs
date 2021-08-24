import winston, { Logger } from 'winston';

const logConfiguration: {
	transports: (winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance)[];
} = {
	transports: [
		new winston.transports.File({
			level: 'verbose',
			filename: './logs/verbose.log'
		}),
		// new winston.transports.Console({
		// 	level: 'verbose'
		// }),
		new winston.transports.File({
			level: 'error',
			filename: './logs/error.log'
		}),
		// new winston.transports.Console({
		// 	level: 'error'
		// }),
		new winston.transports.File({
			level: 'debug',
			filename: './logs/debug.log'
		}),
		// new winston.transports.Console({
		// 	level: 'debug'
		// }),
		new winston.transports.File({
			level: 'warn',
			filename: './logs/warn.log'
		}),
		// new winston.transports.Console({
		// 	level: 'warn'
		// }),
		new winston.transports.File({
			level: 'info',
			filename: './logs/info.log'
		}),
		// new winston.transports.Console({
		// 	level: 'info'
		// }),
		new winston.transports.File({
			level: 'silly',
			filename: './logs/silly.log'
		})
		// new winston.transports.Console({
		// 	level: 'silly'
		// })
	]
};

const logger: Logger = winston.createLogger(logConfiguration);

module.exports = {
	logger
};
