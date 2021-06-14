import ip from 'ip'

/**
 * Application Port
 */
const PORT: number = 3002
const IP: string = ip.address()

/**
 * Json Web Token
 */
const JWT_KEY: string = '123456'

/**
 * One Time Password
 */

/**
 * Session
 */
const SESSION_SECRET: string = '123456'

/**
 * Database
 */
const CreateDb: boolean = true
const SeedDb: boolean = true
const RemoveDb: boolean = true
const RefreshDb: boolean = true

/**
 * Visual Logs
 */
const ShowVisualLogsForEveryRequest: boolean = false

/**
 * Password Encryptions
 */
const EncryptionSalt: number = 8

/**
 * Log Settings
 */
const ClearLogsOnEveryStartup: boolean = true

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
  RemoveDb,
  EncryptionSalt,
  ShowVisualLogsForEveryRequest,
  ClearLogsOnEveryStartup,
}
