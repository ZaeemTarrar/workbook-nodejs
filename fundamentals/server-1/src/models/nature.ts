export {}
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('./../database/sequelize')

/* ORM => Object Relational Model */
const Nature = sequelize.define('nature', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    default: true,
  },
})

module.exports = Nature
