console.log()

module.exports = (): void => {
  /**
   * Imports
   */
  //   const Nature = require('./../models/nature')
  const User = require('./../models/user')
  const Category = require('./../models/category')
  const Tag = require('./../models/tag')
  const Product = require('./../models/product')
  const Profile = require('./../models/profile')

  /**
   * Relations
   */

  // One to Many
  Category.hasMany(Product)
  Product.belongsTo(Category)

  // One to One
  User.hasOne(Profile)
  Profile.belongsTo(User)

  // Many to Many
  Product.belongsToMany(Tag, { through: 'Product_Tag' })
  Tag.belongsToMany(Product, { through: 'Product_Tag' })

  // One to Many
  User.hasMany(Product)
  Product.belongsTo(User)
}
