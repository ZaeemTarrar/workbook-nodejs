export {}
const { INTEGER, STRING, BOOLEAN, DATE } = require('sequelize').DataTypes
const { sequelize } = require('./../database/sequelize')

/* ORM => Object Relational Model */
const tableName: string = 'tags'
const Table: any = sequelize.define(
  tableName,
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    active: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: false, // Pluralization,
    tableName: tableName,
    timestamps: true,
  },
)

module.exports = Table
