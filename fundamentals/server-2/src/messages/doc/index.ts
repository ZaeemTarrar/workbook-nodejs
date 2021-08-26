/**
 * Message Strings
 */
module.exports.Auth = {
	Registered: 'User Registered',
	NotRegistered: 'User could not be Registered',
	LoggedIn: 'User Logged In',
	UserNotFound: 'User was not found',
	EmailSent: 'Email to Reset Password has been successfully sent',
	EmailNotSend: 'Email could not be sent',
	EmailNotRegistered: 'Email is not Registered',
	PasswordUpdated: 'Password successfully updated',
	PasswordNotUpdated: 'Password could not be updated',
	TokenRefreshed: 'User Token refreshed successfully',
	TokenNotRefreshed: 'User Token could not be refreshed',
	TokenNotExpired: 'Token not Expired',
	LoggedOut: 'User successfully Logged Out',
	InvalidCredentials: 'Invalid Credentials Provided',
	UserNotVerified: 'User is not Verified',
	NoUserInSession: 'User not found in the Session',
	NotLoggedOutNoSession: 'Could not Logout, since no user session was available'
};

module.exports.User = {
	NoUsersFound: 'No Users Found',
	UsersFound: 'List of all Users',
	NoUserFound: 'No User Found',
	UserFound: 'User Found',
	NoUsersExtraFound: 'No Users Found',
	UsersExtraFound: 'List of all Users',
	NoUserExtraFound: 'No User Found',
	UserExtraFound: 'User Found',
	Updated: 'User updated',
	PasswordUpdated: 'User Password updated',
	Deleted: 'User has been deleted'
};

module.exports.Role = {
	NoRolesFound: 'No Roles Found',
	RolesFound: 'List of all Roles',
	NoRoleFound: 'No Role Found',
	RoleFound: 'Role Found',
	NoRolesExtraFound: 'No Roles Found',
	RolesExtraFound: 'List of all Roles',
	NoRoleExtraFound: 'No Role Found',
	RoleExtraFound: 'Role Found'
};

module.exports.SubRole = {
	NoSubRolesFound: 'No SubRoles Found',
	SubRolesFound: 'List of all SubRoles',
	NoSubRoleFound: 'No SubRole Found',
	SubRoleFound: 'SubRole Found',
	NoSubRolesExtraFound: 'No SubRoles Found',
	SubRolesExtraFound: 'List of all SubRoles',
	NoSubRoleExtraFound: 'No SubRole Found',
	SubRoleExtraFound: 'SubRole Found',
	Created: 'New SubRole created',
	Updated: 'SubRole has been updated',
	Deleted: 'SubRole has been deleted',
	NotDeleted: 'SubRole could not be deleted'
};

module.exports.Complain = {
	NoComplainsFound: 'No Complains Found',
	ComplainsFound: 'List of all Complains',
	NoUserComplainsFound: 'No Complains Found',
	UserComplainsFound: 'List of all Complains',
	NoComplainFound: 'No Complain Found',
	ComplainFound: 'Complain Found',
	Created: 'New Complain created',
	Updated: 'Complain has been updated',
	Deleted: 'Complain has been deleted',
	NotDeleted: 'Complain could not be deleted'
};

module.exports.Feed = {
	NoPublicFeedsFound: 'No Public Feeds Found',
	PublicFeedsFound: 'List of all Public Feeds Found',
	NoPrivateFeedsFound: 'No Private Feeds Found',
	PrivateFeedsFound: 'List of all Private Feeds Found',
	NoPublicFeedFound: 'No Public Feed Found',
	PublicFeedFound: 'Public Feed Found',
	NoPrivateFeedFound: 'No Private Feed Found',
	PrivateFeedFound: 'Private Feed Found',
	NoUserPublicFeedsFound: 'No User Public Feeds Found',
	UserPublicFeedsFound: 'List of all User Public Feeds',
	NoUserPrivateFeedsFound: 'No User Private Feeds Found',
	UserPrivateFeedsFound: 'List of all User Private Feeds Found',
	Created: 'New Feed created',
	Updated: 'Feed has been updated',
	Deleted: 'Feed has been deleted',
	NotDeleted: 'Feed could not be deleted'
};

module.exports.Firebase = {
	PrivateSent: 'Firebase Private Notification Sent',
	PrivateNotSent: 'Firebase Private Notification Not Sent',
	PublicSent: 'Firebase Public Notification Sent',
	PublicNotSent: 'Firebase Public Notification Not Sent'
};
