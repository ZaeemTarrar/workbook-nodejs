/**
 * Cleaning Console
 */
console.clear()
console.log('\n')
/**
 * Imports
 */
import { red, green, blue, cyan, magenta, yellow, bold, gray } from 'colors'
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import responseTime from 'response-time'
import axios from 'axios'
import http, { Server } from 'http'
import https from 'https'
import morgan from 'morgan'
import compression from 'compression'
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status'
const Configurations: any = require('./configurations/index')
const { AppServer, AppSession, Http2, Morgan }: any = Configurations
const numCPUs = require('os').cpus().length
const { logger }: any = require('./utils/logHelpers/index')
const { fork }: any = require('child_process')
var requestStats = require('request-stats')
const Socket: any = require('socket.io')
const { events }: any = require('./events/index')
const ApiTools: any = require('./libraries/ApiTools/index')
const {
  RedisConnection,
  setSession,
  getSession,
}: any = require('./storage/redisServer')
const { MongoConnection }: any = require('./database/mongoose')

/**
 * Express Application
 */
var app: Express = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: AppSession?.Secret,
    saveUninitialized: false,
    resave: false,
  }),
)
app.use(cors())
app.use(responseTime())
app.use(compression())
app.use(morgan('combined', Morgan.AccessLogStream))

/**
 * Custom Middlewares
 */
app.use(ApiTools.gate)

/**
 * Process Forks
 */
const childFork: any = fork('./src/forks/child.ts')

/**
 * API Navigation Routes
 */
const apiGroup: any = express.Router()
apiGroup.use('/roles', require('./routes/role'))

/**
 * Router Grouping
 */
app.use('/api', apiGroup)

/**
 * Base Routes
 */
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  childFork.send(29)
  childFork.on('message', (message: any): void => {
    console.log(`Message from child.js: ${message}`)
    ApiTools.set(OK, 'Hello There', 'Now').show().send()
  })
})

/**
 * Error Handling API Routes
 */
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('ok')
})
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(OK).json('ok')
})

/**
 * Main Server Launch Method
 */
const LaunchServer: Function = async (): Promise<void> => {
  /**
   * Connecting the Redis Server
   */
  await RedisConnection()

  /**
   * Connecting MongoDb Database ( ORM => Mongoose )
   */
  await MongoConnection()

  /**
   * Initializing Simple / Secure Server
   */
  const server: Server =
    AppServer.Secure == 'false'
      ? http.createServer(app)
      : https.createServer(Http2.Options, app)

  /**
   * Integrating Request Statistics Logs
   */
  requestStats(server, function (stats: any) {})

  /**
   * Launching Server Listening Process
   */
  server.listen(AppServer.Port, AppServer.IpAddress, () => {
    let serverType: string = AppServer.Secure != 'false' ? 'Secure ' : ''
    serverType += 'Server is Listening at: '
    let serverUrl: string = `${AppServer.Protocol}://${AppServer.IpAddress}:${AppServer.Port}/`
    console.log(bold(blue(`${serverType}${bold(red(serverUrl))}`)))
  })
}

LaunchServer()
