let AppStarted = Date.now()
import { red, green, blue, cyan, magenta, yellow, bold, gray } from 'colors'
import express from 'express'
import session from 'express-session'
// import logger from 'express-logger'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import redis from 'redis'
import http from 'http'
import morgan from 'morgan'
const { Server } = require('socket.io')
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from 'http-status'
// const logger = morgan('combined');
const { sequelize } = require('./database/sequelize')
const {
  PORT,
  IP,
  CreateDb,
  RefreshDb,
  SeedDb,
  RemoveDb,
  ClearLogsOnEveryStartup,
} = require('./configurations/index')
const R = require('./utils/response')
const { ClearLogs } = require('./utils/logs')
// const { fire } = require('./fire')

const app = express()

/**
 * Relationships
 */
const BuildModelRelations = require('./db-helpers/relationship')

/**
 * Db Table Dropper
 */
const DbDropper = require('./db-helpers/drop')

/**
 * Seeder Methods
 */
const { Seeder } = require('./seeder/index')

/**
 * Middleware Imports
 */
// const auth = require('./middlewares/auth/index');
const mainGate = require('./middlewares/mainGate/index')

/**
 * Router Imports
 */
const NatureRouter = require('./routes/nature')
const UserRouter = require('./routes/user')
const ProfileRouter = require('./routes/profile')

// app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: '123456',
    saveUninitialized: false,
    resave: false,
  }),
)
app.use(cors())

/**
 * Middleware Integration
 */
app.use(mainGate)

/**
 * Main Routes
 */
app.use('/nature', NatureRouter)
app.use('/user', UserRouter)
app.use('/user-profile', ProfileRouter)

/**
 * Regular Routes
 */
app.use('/test', (req, res, next) => {
  res.json(R(OK, 'Application is Running Perfectly'))
})

app.use('/', (req, res, next) => {
  res.json(R(NOT_FOUND, null))
})

app.use((req, res, next) => {
  res.json(R(INTERNAL_SERVER_ERROR, null))
})

const Chain = new Promise<void>((resolve, reject) => resolve())
Chain.then((): void => {
  console.clear()
  if (ClearLogsOnEveryStartup) {
    /**
     * Clear Logs
     */
    ClearLogs()
  }
})
  .then((): void => {
    if (RemoveDb) {
      console.log(red(`\nRemoving All Tables from Database`))
      // return sequelize.drop();
      return DbDropper()
    }
  })
  .then((): void => {
    // Relation Definitions
    return BuildModelRelations()
  })
  .then((): void => {
    // Database Creation / Refreshing / Seeding
    if (CreateDb) {
      return sequelize
        .sync({ force: RefreshDb })
        .then((result: any) => {
          console.log(blue(`\nSQL Database Connected`))
          if (RefreshDb) {
            console.log(blue(`SQL Database Refreshed`))
          }
        })
        .then((): any => {
          if (SeedDb) {
            return Seeder()
          }
        })
        .catch((err: Error): void => {
          console.log(
            red('Sequelize Error: '),
            gray(JSON.stringify(err.message, null, 2)),
          )
        })
    } else {
      return
    }
  })
  .then((): any => {
    // Main Server
    const server: http.Server = http.createServer(app)
    const io = new Server(server)
    /**
     * Sockets
     */
    io.on('connection', (socket: any) => {
      console.log(bold(cyan(`Socket Connected: ${socket.id}`)))
      socket.on('disconnect', () => {
        console.log(bold(red(`Socket Disconnected: ${socket.id}`)))
      })
    })

    return server
  })
  .then((server: any): void => {
    server.listen(PORT, (): void => {
      let AppServerStarted = Date.now()
      let TimeTaken = (AppServerStarted - AppStarted) / 1000.0
      console.log(
        bold(green(`\nApplication Started at ${red(IP)}:${blue(PORT)}`)),
        bold(
          gray(
            `\t ( Server Execution Time: ${green(
              TimeTaken.toString() + ` seconds`,
            )} )`,
          ),
        ),
      )
    })
  })
  .catch((err: Error) => {
    console.log(
      bold(red(`Server Error: `)),
      bold(gray(JSON.stringify(err, null, 2))),
    )
  })
