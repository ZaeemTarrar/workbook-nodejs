/**
 * Imports
 */
var admin: any = require('firebase-admin');
const FCM: any = require('fcm-node');
var serviceAccount: any = require('./rfms-dham-firebase-adminsdk-z2ivj-154fc8c8b5.json');

/**
 * Initializing
 */
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
	// databaseURL: 'https://panic-alarm-system-f791b.firebaseio.com'
});

/**
 * Server Key
 */
const ServerKey: any =
	'AAAA-oXBEzI:APA91bFmXsx5UQXsjpJm1iWJyEzlW5xjDBx-oUgXA1WhMXo154cGRG8YJJzLsfxhpj3gx9OdvKgLr_lY2lFigc_z2OuPWTsz7UoxYHbUACppTPklKjt1dDUIL0FMUPfBPSAaz1DcZOzJ';

/**
 * Key Pair
 */
const WebKeyPair: any = 'BMbBunAtFA7CDzmHJUxypHJ0_EAFEe8cndNTsEdfaeDKZbfNUMwd1q4VQb-Oka9cdUeUdKkGORFMX3wkKAjlEQY';

/**
 * Registeration Token
 */
const RegisterationToken: any = '';

// try {
// 	const fcm: any = new FCM(ServerKey);
// 	const message: any = {
// 		to: '',
// 		notification: {
// 			title: '',
// 			body: '',
// 			sound: 'default',
// 			click_action: 'FCM_PLUGIN_ACTIVITY',
// 			icon: 'fcm_push_icon'
// 		}
// 	};
// } catch (err) {}

/**
 * Firebase Options
 */
var options: any = {
	priority: 'normal',
	timeToLive: 60 * 60
};

const SendNotification: Function = async (fcm: any, title: string, body: any, DATA: any = {}): Promise<any> => {
	const payload: any = {
		notification: {
			title: title,
			body: body
		},
		data: {
			...DATA,
			title: title,
			body: body
			// KeyIntent: "Responder Assigned by System",
		}
	};
	const response: any = await admin.messaging().sendToDevice(fcm, payload, options);
	return response;
};

const SendTopicNotification: Function = async (topic: any, title: string, body: any, DATA: any = {}): Promise<any> => {
	const payload: any = {
		notification: {
			title: title,
			body: body
		},
		data: {
			...DATA,
			title: title,
			body: body
			// KeyIntent: "Responder Assigned by System",
		}
	};
	const response: any = await admin.messaging().sendToTpoic(topic, payload, options);
	return response;
};

const SendDeviceGroupNotification: Function = async (
	key: any,
	title: string,
	body: any,
	DATA: any = {}
): Promise<any> => {
	var payload: any = {
		notification: {
			title: title,
			body: body
		},
		data: DATA
	};
	const response: any = await admin.messaging().sendToDeviceGroup(key, payload, options);
	return response;
};

module.exports = {
	SendNotification,
	SendTopicNotification,
	SendDeviceGroupNotification
};
