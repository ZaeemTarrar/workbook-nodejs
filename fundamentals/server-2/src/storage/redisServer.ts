/**
 * Imports
 */
import { red, bold, green, yellow, blue } from 'colors'
import redis from 'redis'
import { promisify } from 'util'

/**
 * Required Declarations
 */
let client: any = redis.createClient({})
let setAsync: any = promisify(client.set).bind(client)
let getAsync: any = promisify(client.get).bind(client)

/**
 * Main Redis Server Connection
 */
const RedisConnection: Function = async (): Promise<any> => {
  return new Promise<void>((resolve, reject) => {
    /**
     * Redis Connection
     */
    let client: any = redis.createClient({})

    /**
     * Redis Failure Event Registration
     */
    client.on('error', (err: Error) => {
      console.log(bold(red(`Error: `)), bold(yellow(err.message)))
    })

    /**
     * Redis Success Event Registration
     */
    client.on('connect', async () => {
      /**
       * Setting up Getter & Setters of Redis Session
       */
      setAsync = await promisify(client.set).bind(client)
      getAsync = await promisify(client.get).bind(client)

      /**
       * Redis Connection Success Logs
       */
      console.log(bold(blue(`Redis Local Session Storage Connected`)))

      /**
       * Finishing Connection Process
       */
      resolve()
    })
  }).catch((err: Error) => {
    /**
     * Redis Connection Error Logs
     */
    console.log(
      bold(red(`Redis Local Session Storage Connection Failed`)),
      bold(yellow(err.message)),
    )
  })
}

module.exports = { RedisConnection, setSession: setAsync, getSession: getAsync }
