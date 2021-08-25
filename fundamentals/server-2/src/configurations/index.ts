/**
 * Imports
 */
import fs from 'fs'
import { bold, red, yellow, blue, cyan } from 'colors'
import dotenv, { DotenvConfigOutput } from 'dotenv'
import { address } from 'ip'
import path from 'path'
const result: DotenvConfigOutput = dotenv.config({ path: './development.env' })
const { parsed, error }: any = result
const rfs: any = require('rotating-file-stream')

try {
  /**
   * Exception Handling
   */
  if (error) throw new Error(error)

  /**
   * Loading Configurations
   */
  const ApplicationMode: string = parsed.MODE || 'development'

  const AppServer: object = {
    Secure: parsed.SECURE_SERVER,
    IpAddress: address() || parsed.HOST,
    Port: parsed.SECURE_SERVER != 'false' ? parsed.SECURE_PORT : parsed.PORT,
    Protocol:
      parsed.SECURE_SERVER != 'false'
        ? parsed.SECURE_PROTOCOL
        : parsed.PROTOCOL,
  }

  const AppSession: object = {
    Secret: parsed.SESSION_SECRET,
  }

  const Jwt: object = {
    Key: parsed.JWT_KEY,
    Expiry: parsed.JWT_EXPIRY,
    Algorithm: parsed.JWT_ALGORITH,
  }

  const Http2: object = {
    Options: {
      // key: fs.readFileSync('server.key'),
      // cert: fs.readFileSync('server.crt'),
      key: fs.readFileSync('localhost-privkey.pem'),
      cert: fs.readFileSync('localhost-cert.pem'),
      requestCert: false,
      rejectUnauthorized: false,
    },
  }

  const Morgan: object = {
    AccessLogStream: {
      stream: rfs.createStream('access.log', {
        interval: '1d',
        path: path.join(__dirname, 'log'),
      }),
    },
  }

  let MongoDbCredentials: object | any = null
  let MongoDbOptions: object | any = null

  MongoDbCredentials = {
    host: parsed.MONGO_DB_HOST || 'localhost',
    port: parsed.MONGO_DB_PORT || '27017',
    database: parsed.MONGO_DB_DATABASE,
  }

  if (ApplicationMode === 'production') {
    MongoDbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true, // Don't build indexes
      poolSize: 100, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6,
      user: parsed.MONGO_DB_USER,
      pass: parsed.MONGO_DB_PASS,
      authSource: parsed.MONGO_DB_AUTH_SOURCE,
    }
  } else if (ApplicationMode === 'development') {
    MongoDbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true, // Don't build indexes
      poolSize: 100, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 10000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6,
    }
  }

  /**
   * Exports
   */
  module.exports = {
    AppServer,
    Http2,
    AppSession,
    ApplicationMode,
    Morgan,
    MongoDbCredentials,
    MongoDbOptions,
    Jwt,
  }

  /**
   * Success Logs
   */
  console.log(bold(cyan('Configurations Initialized')))
} catch (err) {
  /**
   * Error Logs
   */
  console.log('Configurations Error: ', (<Error>err).message)
}
