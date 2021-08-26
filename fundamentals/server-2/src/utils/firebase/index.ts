/**
 * Imports
 */
var admin: any = require('firebase-admin');
var serviceAccount: any = require('./panic-key.json');

/**
 * Initializing
 */
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://panic-alarm-system-f791b.firebaseio.com'
});

const FirebaseMsg = (topic: any, title: any, body: any, DATA: any = {}) => {
	var registrationToken: any = null;
	var payload = {
		notification: {
			title: title,
			body: body
		},
		data: DATA
	};
	var options: any = {
		priority: 'normal',
		timeToLive: 60 * 60
	};
	admin
		.messaging()
		.sendToTopic(topic, payload)
		.then(function(response: any) {
			console.log('Successfully sent message:', response);
		})
		.catch(function(error: any) {
			console.log('Error sending message:', error);
		});
};

/**
 * Custom
 */
const FirebaseMsgTopic = (
	title: any,
	body: any,
	topic: any,
	image_name: any,
	active: any,
	priority: any,
	key: any,
	notificationtype: any,
	DATA: any = {}
) => {
	DATA = {
		heading: title,
		Message: body,
		topic: topic,
		image_name: image_name,
		active: active,
		priority: priority,
		key: key,
		notificationtype: notificationtype
	};

	var payload: any = {
		data: DATA
	};
	var options: any = {
		priority: 'normal',
		timeToLive: 60 * 60
	};
	admin
		.messaging()
		.sendToTopic(topic, payload)
		.then(function(response: any) {
			console.log('Successfully sent message:', response);
		})
		.catch(function(error: any) {
			console.log('Error sending message:', error);
		});
};

const AuthenticateUserId = async (uid: any, cb = null) => {
	await admin
		.auth()
		.getUser(uid)
		.then(function(userRecord: any) {
			// See the UserRecord reference doc for the contents of userRecord.
			// res.json(RES(200, "Test Data", userRecord));
			// cb(userRecord);
		})
		.catch(function(error: any) {
			// res.json(RES(200, "Test Data", error));
		});
};

const PrivateMessage = (
	title: any,
	message: any,
	FCM: any,
	imagepath: any,
	key: any,
	notificationtype: any,
	DATA: any = {}
) => {
	var registrationToken = FCM;
	DATA = {
		heading: title,
		Message: message,
		image_name: imagepath,
		key: key,
		notificationtype: notificationtype
	};
	var payload = {
		data: DATA,
		token: registrationToken
	};
	admin
		.messaging()
		.send(payload)
		.then((response: any) => {
			console.log('Successfully sent message:', response);
		})
		.catch((error: any) => {
			console.log('Error sending message:', error);
		});
};

const silentNotificationtopic = (key: any, notificationType: any, topic: any, DATA: any = {}) => {
	DATA = {
		key: key,
		notificationType: notificationType
	};
	var payload: any = {
		data: DATA
	};
	admin
		.messaging()
		.sendToTopic(topic, payload)
		.then(function(response: any) {
			console.log('Successfully sent message:', response);
		})
		.catch(function(error: any) {
			console.log('Error sending message:', error);
		});
};

const silentNotificationFCM = (key: any, notificationType: any, FCM: any, DATA: any = {}) => {
	var registrationToken: any = FCM;
	DATA = {
		key: key,
		notificationType: notificationType
	};
	var payload: any = {
		data: DATA,
		token: registrationToken
	};
	admin
		.messaging()
		.send(payload)
		.then((response: any) => {
			console.log('Successfully sent message:', response);
		})
		.catch((error: any) => {
			console.log('Error sending message:', error);
		});
};

const indMsg = async (token: any, info: any, cb: any = null) => {
	// This registration token comes from the client FCM SDKs.
	// var registrationToken = 'YOUR_REGISTRATION_TOKEN';

	var message: any = {
		data: {
			...info
		},
		token: token
	};

	// Send a message to the device corresponding to the provided
	// registration token.
	await admin
		.messaging()
		.send(message)
		.then((response: any) => {
			// Response is a message ID string.
			// console.log('Successfully sent message:', response);
			cb(response);
		})
		.catch((error: any) => {
			cb(error);
		});
};
module.exports.PMessage = PrivateMessage;
module.exports.TopicNotification = FirebaseMsgTopic;
module.exports.silentNotificationtopic = silentNotificationtopic;
module.exports.silentNotificationFCM = silentNotificationFCM;
module.exports.fire = FirebaseMsg;
module.exports.auth = AuthenticateUserId;
module.exports.ind = async (token: any, title: any, msg: any, info: any, cb: any = null) => {
	var registrationToken: any = token;
	var payload: any = {
		notification: {
			title: title,
			body: msg
		},
		data: {
			...info,
			title: title,
			body: msg
			// KeyIntent: "Responder Assigned by System",
		}
	};
	var options: any = {
		priority: 'normal',
		timeToLive: 60 * 60
	};
	try {
		await admin
			.messaging()
			.sendToDevice(registrationToken, payload, options)
			.then(function(response: any) {
				console.log('Successfully sent message:', response);
				cb(response);
			})
			.catch(function(error: any) {
				console.log('Error sending message:', error);
				cb(error);
			});
	} catch (e) {
		console.log('Error: ', e);
	}
};
