import { cyan, red, green, blue, yellow, bold, gray } from 'colors'

import { T_Nature } from '../contracts/model/nature'
import { T_User } from '../contracts/model/user'

const Nature = require('./../models/nature')
const User = require('./../models/user')

module.exports.Seeder = (): Promise<void> | void => {
  try {
    console.log(bold(cyan(`\nInitializing Database Seeder`)))
    /**
     * Dummy Data Loadings
     */
    let natures: T_Nature[] = require('./../data/seeds/nature.json').data
    let users: T_User[] = require('./../data/seeds/user.json').data

    /**
     * Seed Promises
     */
    let Natures_Promise: Promise<void> = Nature.bulkCreate(natures).then(
      (result: any): any => {
        console.log(bold(cyan(`${blue(`Nature`)} Table Seeded`)))
        return result
      },
    )
    let Users_Promise: Promise<void> = User.bulkCreate(users).then(
      (result: any): any => {
        console.log(bold(cyan(`${blue(`User`)} Table Seeded`)))
        return result
      },
    )
    /**
     * Main Seeding Chain
     */
    const SeedChain: Promise<any[]> = Promise.all([
      Natures_Promise,
      Users_Promise,
    ])
    return SeedChain.then((values: any) => {
      values.map((value: any, index: any): void => {
        // Do Something
      })
    })
      .then((): void => {
        console.log(bold(cyan(`Database Tables Seeded Successfully`)))
      })
      .catch((err: Error): void => {
        console.log(
          red('Database Tables Seeding Error: '),
          gray(JSON.stringify(err, null, 2)),
        )
      })
  } catch (err) {
    console.log(bold(red(`Error: ${err}`)))
  }
}
