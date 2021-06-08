export {}
const { INTEGER, STRING, BOOLEAN, DATE, TEXT } = require('sequelize').DataTypes
const { sequelize } = require('./../database/sequelize')
// const { bcrypt } = require('bcrypt-nodejs')
// const { EncryptionSalt } = require('./../configurations/index')

/* ORM => Object Relational Model */
const tableName: string = 'users'
const Table: any = sequelize.define(
  tableName,
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false, // Pluralization,
    tableName: tableName,
    timestamps: true,
  },
)

module.exports = Table
