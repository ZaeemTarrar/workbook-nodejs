export {}
const { INTEGER, STRING, BOOLEAN, DATE, TEXT } = require('sequelize').DataTypes
const { sequelize } = require('./../database/sequelize')
const { ENUM } = require('sequelize').DataTypes
// const { bcrypt } = require('bcrypt-nodejs')
// const { EncryptionSalt } = require('./../configurations/index')
const { Role, RoleValues, RoleKeys } = require('./../static/roles/roles')

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
    role: {
      type: ENUM,
      values: [...RoleKeys],
      allowNull: false,
      defaultValue: Role.CLIENT,
    },
  },
  {
    freezeTableName: false, // Pluralization,
    tableName: tableName,
    timestamps: true,
  },
)

module.exports = Table
