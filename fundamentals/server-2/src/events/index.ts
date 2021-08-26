/**
 * Imports
 */
import { bold, red, cyan, white, bgRed } from 'colors';
var EventEmitter: any = require('events');
const SendEmail: any = require('./../utils/email/index');

try {
	/**
   * Exception Handling
   */
	if (!EventEmitter) throw new Error('Event Emitter could not be Loaded');

	/**
   * Initializing Event Emitter
   */
	var events = new EventEmitter();

	/**
   * Setting Up Event Listeners of the Project
   */
	const Listeners: Function = (): void => {
		/**
     * Testing Event
     */
		events.on('test', (data: any) => {
			console.log('Testing ...');
		});

		/**
     * Email Sending Event
     */
		events.on('send-email', async (data: any) => {
			const result: any = await SendEmail({
				to: data.email,
				subject: data.subject,
				text: data.message
			});
			let status: boolean = false;
			if (result && result.accepted && result.accepted.length > 0) status = true;
			/**
       * Response
       */
			events.emit('email-sent', status);
		});

		/**
     * Firebase Private Notification
     */
		events.on('send-private-notification', (data: any) => {
			console.log(bgRed(bold(white('Firebase Private'))));
			const status: boolean = true;
			events.emit('private-notification-sent', status);
		});
		events.on('send-public-notification', (data: any) => {
			console.log(bgRed(bold(white('Firebase Public'))));
			const status: boolean = true;
			events.emit('public-notification-sent', status);
		});
	};

	/**
   * Calling Listener Method
   */
	Listeners();

	/**
   * Exports
   */
	module.exports = { events };

	/**
   * Success Logs
   */
	console.log(bold(cyan('Event Emitter Initialized')));
} catch (err) {
	/**
   * Error Logs
   */
	console.log(bold(red('Event Emitter Initialization Failed')));
}
