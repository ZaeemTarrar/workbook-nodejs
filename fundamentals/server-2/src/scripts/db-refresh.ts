/**
 * Imports
 */
const {
  MongoConnection,
  CollectionDropper,
}: any = require('./../database/mongoose')

/**
 * Main Script Launcher
 */
const LaunchScript: Function = async (): Promise<void> => {
  /**
   * Database Connection
   */
  await MongoConnection()

  /**
   * Database Refreshing
   */
  await CollectionDropper()

  /**
   * Database Filling Initial Dummy Data
   */
  process.exit()
}

/**
 * Script Fire
 */
LaunchScript()
