import { cyan, red, green, blue, yellow, bold, gray } from 'colors'
const { GenerateHash } = require('./../utils/password')

/**
 * Type Contract Imports
 */
import { T_Nature } from '../contracts/model/nature'
import { T_User } from '../contracts/model/user'
import { T_Profile } from '../contracts/model/profile'
import { T_Product } from '../contracts/model/product'
import { T_Category } from '../contracts/model/category'
import { T_Tag } from '../contracts/model/tag'

/**
 * Db Model Imports
 */
const Nature = require('./../models/nature')
const User = require('./../models/user')
const Profile = require('./../models/profile')
const Product = require('./../models/product')
const Category = require('./../models/category')
const Tag = require('./../models/tag')

module.exports.Seeder = (): Promise<void> | void => {
  try {
    console.log(bold(cyan(`\nInitializing Database Seeder`)))
    /**
     * Dummy Data Loadings
     */
    let natures: T_Nature[] = require('./../data/seeds/nature.json').data
    let users: T_User[] = require('./../data/seeds/user.json').data
    let profiles: T_Profile[] = require('./../data/seeds/profile.json').data
    let categories: T_Category[] = require('./../data/seeds/category.json').data
    let tags: T_Tag[] = require('./../data/seeds/tag.json').data
    let products: T_Product[] = require('./../data/seeds/product.json').data

    /**
     * Hashing Password Promise Method
     */
    const users_password_promises = users.map((row) => {
      return GenerateHash(row.password)
    })
    const users_hash_passwords: Promise<void> = Promise.all([
      ...users_password_promises,
    ]).then((result: any) => {
      for (let i in users) {
        users[i].password = result[i]
      }
    })

    /**
     * Pivot Table Seeding Method
     */
    const Pivot = (
      Table1: object | any,
      Table2: object | any,
      Table2String: string,
      id1: number,
      id2: number,
    ): Promise<void> | void => {
      try {
        return Table1.findOne({ where: { id: id1 } }).then((tb1: any) => {
          Table2.findOne({ where: { id: id2 } }).then((tb2: any) => {
            tb1[`add${Table2String}`](tb2)
          })
        })
      } catch (err) {
        console.log(
          bold(
            red(`Pivot Seeding Error: (${Table1}: ${id1}) (${Table2}: ${id2})`),
          ),
        )
      }
    }

    /**
     * Hashing User Passwords before Seeding
     */
    return users_hash_passwords
      .then(() => {
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
        let Profiles_Promise: Promise<void> = Profile.bulkCreate(profiles).then(
          (result: any): any => {
            console.log(bold(cyan(`${blue(`Profile`)} Table Seeded`)))
            return result
          },
        )
        let Categories_Promise: Promise<void> = Category.bulkCreate(
          categories,
        ).then((result: any): any => {
          console.log(bold(cyan(`${blue(`Category`)} Table Seeded`)))
          return result
        })
        let Tags_Promise: Promise<void> = Tag.bulkCreate(tags).then(
          (result: any): any => {
            console.log(bold(cyan(`${blue(`Tag`)} Table Seeded`)))
            return result
          },
        )
        let Products_Promise: Promise<void> = Product.bulkCreate(products).then(
          (result: any): any => {
            console.log(bold(cyan(`${blue(`Product`)} Table Seeded`)))
            return result
          },
        )

        /**
         * Main Seeding Chain
         */
        const SeedChain: Promise<any[]> = Promise.all([
          /**
           * Model Seeding Promises
           */
          Natures_Promise,
          Users_Promise,
          Profiles_Promise,
          Categories_Promise,
          Tags_Promise,
          Products_Promise,
        ])
        return SeedChain.then((values: any) => {
          return values.map((value: any, index: any): void => {
            // Do Something
          })
        })
          .then((): void => {
            /**
             * Pivot Table Seeding Section
             */
            let Fn = () => {
              Pivot(Tag, Product, 'Product', 1, 1)
              Pivot(Tag, Product, 'Product', 3, 1)
              Pivot(Tag, Product, 'Product', 2, 2)
              Pivot(Tag, Product, 'Product', 4, 2)
            }
            return Fn()
          })
          .then((): void => {
            console.log(bold(cyan(`Database Tables Seeded Successfully`)))
          })
          .catch((err: Error): void => {
            console.log(
              red('Database Tables Seeding Error: '),
              gray(err.message),
            )
          })
      })
      .catch((e: Error) => {
        console.log(bold(red(`Error: ${e.message || null}`)))
      })
  } catch (err) {
    console.log(bold(red(`Error: ${err}`)))
  }
}
