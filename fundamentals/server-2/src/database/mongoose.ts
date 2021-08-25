/**
 * Imports
 */
import mongoose from 'mongoose'
const Configurations: any = require('./../configurations/index')
const { MongoDbCredentials, MongoDbOptions }: any = Configurations
const { bold, red, blue, magenta, gray }: any = require('colors')

/**
 * Database Connection Link
 */
let MongoLink: string = `mongodb://${MongoDbCredentials.host}:${MongoDbCredentials.port}/${MongoDbCredentials.database}`

/**
 * DB Connection Declaration
 */
let db: any | null = null

/**
 * Method to Drop All the Collections From Database
 */
const CollectionDropper: Function = async (): Promise<void> => {
  try {
    if (db !== null) {
      await db.dropDatabase()
      console.log(bold(magenta(`Database has been Refreshed Successfully`)))
    }
  } catch (err) {
    console.log(bold(red(`Collection Dropper Error: `)), (<Error>err).message)
  }
}

/**
 * Database Connection Method
 */
const MongoConnection: Function = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const DB: any = mongoose.connect(MongoLink, MongoDbOptions)
    db = mongoose.connection

    /**
     * Mongo Connection Error Event
     */
    db.on('error', () => {
      throw new Error()
    })

    /**
     * Mongo Connection Success Event
     */
    db.once('open', () => {
      console.log(
        `${bold(
          blue(`MongoDB Connection Established Successfully: `),
          bold(red(MongoLink)),
        )}`,
      )

      /**
       * Finishing Connection Process
       */
      resolve()
    })
  }).catch((err: Error) => {
    console.log(
      `${bold(red(`MongoDB Connection Error: ${MongoLink}`))}`,
      bold(gray(err.message)),
    )
  })
}

module.exports = {
  MongoConnection,
  CollectionDropper,
}
