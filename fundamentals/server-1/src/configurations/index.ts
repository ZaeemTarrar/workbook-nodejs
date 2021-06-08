import ip from 'ip';

/**
 * Application Port
 */
const PORT: number = 3001;
const IP: string = ip.address();

/**
 * Json Web Token
 */
const JWT_KEY: string = '123456';

/**
 * One Time Password
 */

/**
 * Session
 */
const SESSION_SECRET: string = '';

/**
 * Database
 */
const CreateDb: boolean = true;
const SeedDb: boolean = true;
const RemoveDb: boolean = true;
const RefreshDb: boolean = true;

/**
 * Visual Logs
 */
const ShowVisualLogsForEveryRequest: boolean = true;

/**
 * Export
 */
module.exports = {
	PORT,
	IP,
	JWT_KEY,
	SESSION_SECRET,
	CreateDb,
	SeedDb,
	RefreshDb,
	ShowVisualLogsForEveryRequest
};
