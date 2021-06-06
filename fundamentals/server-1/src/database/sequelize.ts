/**
 * Database
 */
const Sequelize: any = require('sequelize')

const Host: string = 'localhost'
const Database: string = 'sample'
const Username: string = 'root'
const Password: string = ''

const sequelize: any = new Sequelize(Database, Username, Password, {
  dialect: 'mysql',
  host: Host,
  port: 3306,
  connectionLimit: 10,
})

/**
 * Exports
 */
module.exports = {
  sequelize,
  Op: Sequelize.Op,
}
