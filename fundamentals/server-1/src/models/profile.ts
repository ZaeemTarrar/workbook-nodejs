export {}
const { INTEGER, STRING, BOOLEAN, DATE, TEXT } = require('sequelize').DataTypes
const { sequelize } = require('./../database/sequelize')

/* ORM => Object Relational Model */
const tableName: string = 'profiles'
const Table: any = sequelize.define(
  tableName,
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
    },
    lastname: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
    },
    age: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    snap: {
      type: TEXT,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    freezeTableName: false, // Pluralization,
    tableName: tableName,
    timestamps: true,
  },
)

module.exports = Table
