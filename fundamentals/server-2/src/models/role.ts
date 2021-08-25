export {}

/**
 * Imports
 */
const { model, Schema }: any = require('mongoose')
const {
  blue,
  red,
  green,
  magenta,
  yellow,
  cyan,
  bold,
  gray,
}: any = require('colors')

/**
 * Name to be Saved and Used
 */
const CollectionName: string = 'Role'

/**
 * Model Schema
 */
const scheme: any = new Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'Title is Required'],
    get: (v: any) => v.toLowerCase(),
    set: (v: any) => v.toLowerCase(),
    validate: {
      validator(v: any) {
        var letters = /^[A-Za-z]+$/
        if (v.match(letters)) {
          return true
        } else {
          return false
        }
        return true
      },
      message: (props: any) => `${props.value} is not a valid Title`,
    },
  },
  activeStatus: {
    type: Boolean,
    default: true,
    nullable: false,
  },
  //   SubRoles: [
  //     {
  //       type: String,
  //       ref: 'SubRole',
  //     },
  //   ],
})

/**
 * Custom & Static Methods
 */
// scheme.statics.ItemExistenceBridge = async function (
//   id: any,
//   cb: Function,
// ): Promise<any> {
//   const item = await this.findOne({ _id: id }).exec()
//   if (item) cb()
//   else throw new Error('Role not Found')
// }

scheme.statics.CollectAll = function (): any {
  return this.find({}).select('-SubRoles').exec()
}

// scheme.statics.CollectAllWithRelations = async function (
//   res: any,
//   cb: Function,
// ): Promise<void> {
//   if (cb)
//     cb(
//       await this.find({})
//         .populate({
//           path: 'SubRoles',
//           select: '-Role',
//           model: 'SubRole',
//           populate: [
//             { path: 'Authorization', model: 'Authorization' },
//             { path: 'Users', model: 'User', select: '-SubRoles' },
//           ],
//         })
//         .exec(),
//     )
// }
// scheme.statics.CollectOne = async function (
//   res: any,
//   id: any,
//   cb: Function,
// ): Promise<void> {
//   cb(await this.findOne({ _id: id }).select('-SubRoles').exec())
// }
// scheme.statics.CollectOneWithRelations = async function (
//   res: any,
//   id: any,
//   cb: Function,
// ): Promise<void> {
//   cb(
//     await this.findOne({ _id: id })
//       .populate({
//         path: 'SubRoles',
//         select: '-Role',
//         model: 'SubRole',
//         populate: [
//           { path: 'Authorization', model: 'Authorization' },
//           { path: 'Users', model: 'User', select: '-SubRoles' },
//         ],
//       })
//       .exec(),
//   )
// }
// scheme.statics.AddSubRole = async function (
//   parent: string,
//   id: string,
// ): Promise<any> {
//   return await this.findByIdAndUpdate(
//     parent,
//     { $push: { SubRoles: id } },
//     { new: true, useFindAndModify: false },
//   )
//     .select('-SubRoles')
//     .exec()
// }

/**
 * Action Hooks
 */
// scheme.pre('save', function (): void {
//   if (DbHookConsoleLogs)
//     console.log(
//       bold(red(`[${CollectionName}-Save] `)),
//       bold(cyan(`${CollectionName} is going to be saved`)),
//     )
// })
// scheme.post('save', function (doc: any): void {
//   if (DbHookConsoleLogs)
//     console.log(
//       bold(green(`[${CollectionName}-Save] `)),
//       bold(blue(`${CollectionName} has been saved`)),
//       bold(gray(JSON.stringify(doc))),
//     )
// })

// scheme.pre('find', function (): void {
//   if (DbHookConsoleLogs)
//     console.log(
//       bold(red(`[${CollectionName}-Find] `)),
//       bold(cyan(`${CollectionName} is gonna find Something`)),
//     )
// })
// scheme.post('find', function (docs: any): void {
//   if (DbHookConsoleLogs)
//     console.log(
//       bold(green(`[${CollectionName}-Find] `)),
//       bold(blue(`${CollectionName} has found Something`)),
//     )
//   if (DbHookConsoleLogs)
//     console.table(
//       docs.map((r: any): any => ({
//         id: r._id,
//         title: r.title,
//         activeStatus: r.activeStatus,
//       })),
//     )
// })

const Collection: any = model(CollectionName, scheme)

module.exports = Collection
