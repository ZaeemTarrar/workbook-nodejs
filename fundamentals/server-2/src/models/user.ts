export {}

/**
 * Imports
 */
import jwt, { VerifyOptions } from 'jsonwebtoken'
import { v4 } from 'uuid'
import assert from 'assert'
const Configurations: any = require('./../configurations/index')
const { Jwt }: any = Configurations
const { model, Schema }: any = require('mongoose')
const { red, green, yellow, bold }: any = require('colors')
const {
  GenerateHash,
  ValidPassword,
}: any = require('./../utils/encryptors/index')
const SubRolesCollection: any = require('./../models/subrole')
const { setSession, getSession }: any = require('./../storage/redisServer')

/**
 * Name to be Saved and Used
 */
const CollectionName: string = 'User'

/**
 * Model Schema
 */
const scheme: any = new Schema({
  _id: {
    type: String,
  },
  contact: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'Contact is Required'],
    validate: {
      validator(v: any) {
        if (v.length == 11) return true
        else return false
      },
      message: (props: any): string => `${props.value} is not a valid email`,
    },
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'Email is Required'],
    validate: {
      validator(v: any) {
        const letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (v.match(letters)) {
          return true
        } else {
          return false
        }
      },
      message: (props: any): string => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    validate: {
      validator(v: any) {
        return true
      },
      message: (props: any): string => `${props.value} is not a valid Title`,
    },
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Number,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  SubRole: {
    type: String,
    ref: 'SubRole',
    required: true,
  },
})

/**
 * Custom Direct Methods
 */
scheme.methods.Tokenize = function (): any {
  return jwt.sign(
    {
      _id: this._id,
      contact: this.contact,
      email: this.email,
      password: this.password,
    },
    Jwt.Key,
    {
      expiresIn: 60 * Jwt.Expiry,
    },
  )
}
scheme.methods.GetResetPasswordToken = async function () {
  const expiry: any = 3
  const resetToken: any = await jwt.sign({ id: v4() }, Jwt.Key, {
    expiresIn: 60 * expiry,
  })
  const resetTokenExpiry: any = Date.now() + expiry * 60000
  return { resetToken, resetTokenExpiry }
}

/**
 * Custom & Static Methods
 */

/**
 * User Methods
 */
scheme.statics.collectAll = function (): any {
  return this.find({}).select('-SubRole').exec()
}
scheme.statics.collectOne = function (id: string): any {
  return this.findOne({ _id: id }).select('-SubRole').exec()
}
scheme.statics.CollectAll = function (): any {
  return this.find({})
    .populate({
      path: 'SubRole',
      model: 'SubRole',
      select: '-Users',
      populate: [
        { path: 'Role', model: 'Role', select: '-SubRoles' },
        { path: 'Authorization', model: 'Authorization' },
      ],
    })
    .exec()
}
scheme.statics.CollectOne = function (id: string): any {
  return this.findOne({ _id: id })
    .populate({
      path: 'SubRole',
      model: 'SubRole',
      select: '-Users',
      populate: [
        { path: 'Role', model: 'Role', select: '-SubRoles' },
        { path: 'Authorization', model: 'Authorization' },
      ],
    })
    .exec()
}

/**
 * Authentication Methods
 */

scheme.statics.Register = async function (data: any): Promise<any> {
  const creation: any = await this.create({ _id: v4(), ...data })
  const relation = await SubRolesCollection.AddUser(data.SubRole, creation._id)
  return {
    creation: await creation
      .populate('SubRole', '-Users -Authorization -Role')
      .execPopulate(),
    relation: await relation
      .populate('Authorization')
      .populate('Role', '-SubRoles')
      .populate('Users', '-SubRole')
      .execPopulate(),
  }
}
// scheme.statics.Verify = async function(id: string, email: string, password: string): Promise<any> {
// 	const user = await this.findOne({ _id: id, email, password });
// 	if (user) {
// 		return [ true, null, user ];
// 	} else return [ false, 'User is UnAuthorized', null ];
// };
scheme.statics.Login = async function (data: any): Promise<any> {
  const user = await this.findOne({
    $or: [{ email: data.username }, { contact: data.username }],
  })
  assert(user, 'User not found')
  const match: boolean = await ValidPassword(data.password, user.password)
  if (!match) throw new Error('Invalid credentials provided')
  else if (!user.verified) throw new Error('User is not verified')
  else {
    const token = await user.Tokenize()
    await setSession(user._id as string, token as string)
    const setToken: any = await this.findByIdAndUpdate(
      user._id,
      { token },
      { new: true, useFindAndModify: false },
    )
    return { token, updation: setToken }
  }
}

scheme.statics.ForgetPassword = async function (email: string): Promise<any> {
  const user: any = await this.findOne({ email })
  assert(user, 'Email is not registered')
  const {
    resetToken,
    resetTokenExpiry,
  }: any = await user.GetResetPasswordToken()
  const updation: any = await this.findByIdAndUpdate(
    user._id,
    { resetToken, resetTokenExpiry },
    { new: true, useFindAndModify: false },
  )
  return updation
}

// scheme.statics.RefreshToken = async function (token: string): Promise<any> {
//   const user: any = await this.findOne({ token })
//   assert(user, 'No user found')
//     const session: any = await getSession(user._id)
//     const sessionStatus: boolean = session === token ? true : false
//     if (!sessionStatus)
//       return R2(
//         res,
//         UNAUTHORIZED,
//         'Session has been Eliminated, User has logged out',
//         null,
//         1,
//       )
//     else {
//       await jwt.verify(token, JWT_KEY, (err: any, decoded: any): void => {
//         ;(async (): Promise<any> => {
//           if (!err && decoded)
//             return R2(res, BAD_REQUEST, 'Token Not Expired', null, 2)
//           else if (err && user) {
//             const newToken: string = await jwt.sign(
//               { _id: user._id, email: user.email, password: user.password },
//               JWT_KEY,
//               {
//                 expiresIn: 60 * JWT_EXPIRY,
//               },
//             )
//             if (newToken) {
//               await setSession(user._id, newToken)
//               const updated: any = await this.findByIdAndUpdate(
//                 user._id,
//                 { token: newToken },
//                 { new: true, useFindAndModify: false },
//               )
//               if (updated) {
//                 return R2(res, OK, 'Token Refreshed Successfully', {
//                   token: newToken,
//                 })
//               } else {
//                 return R2(res, BAD_REQUEST, 'Token Not Updated', null, 1)
//               }
//             } else {
//               return R2(res, BAD_REQUEST, 'Token Refreshing Error', null, 0)
//             }
//           } else return R2(res, BAD_REQUEST, 'Token Not Identified', null, 1)
//         })()
//       })
//     }
//   }
// }
scheme.statics.ResetPassword = async function (data: any): Promise<any> {
  const user: any = await this.findOne({
    resetToken: data.resetToken,
  }).exec()
  assert(user, 'User not found')
  const decoded: any = jwt.verify(data.resetToken, Jwt.Key)
  const newPassword: string = await GenerateHash(data.password)
  const newData = {
    password: newPassword,
    resetToken: undefined,
    resetTokenExpiry: undefined,
  }
  const updation: any = await this.findByIdAndUpdate(user._id, newData, {
    new: true,
    useFindAndModify: false,
  })
  return { updation }
}
// scheme.statics.UpdatePassword = async function(res: any, data: any, cb: Function): Promise<void> {
// 	if (!data.oldPassword) return R2(res, BAD_REQUEST, 'Old Password Not Provided', null, 1);
// 	else if (!data.newPassword) return R2(res, BAD_REQUEST, 'New Password Not Provided', null, 1);
// 	else if (!data.id) return R2(res, BAD_REQUEST, 'ID Not Provided', null, 1);
// 	else {
// 		const user: any = await this.findOne({ _id: data.id }).exec();
// 		if (!user) return R2(res, BAD_REQUEST, 'User Not Found', null, 0);
// 		else {
// 			if (data.oldPassword == data.newPassword) {
// 				return R2(res, BAD_REQUEST, 'You Can Not Set Your Old Password As New Password', null, 1);
// 			} else {
// 				const match: any = await ValidPassword(data.oldPassword, user.password);
// 				if (match) {
// 					const newPassword: any = await GenerateHash(data.newPassword);
// 					await this.findByIdAndUpdate(
// 						user._id,
// 						{ password: newPassword },
// 						{ new: true, useFindAndModify: false }
// 					);
// 					if (cb) cb();
// 				} else return R2(res, BAD_REQUEST, 'Old Password Is Not Correct', null, 1);
// 			}
// 		}
// 	}
// };
// scheme.statics.Logout = async function(id: string | null = null, res: any, cb: Function): Promise<any> {
// 	if ((await getSession(id)) != '') {
// 		await setSession(id, '');
// 		if (cb) await cb();
// 	} else return R2(res, BAD_REQUEST, 'No Identical User Session Found', null, 1);
// };

/**
 * Action Hooks
 */
scheme.pre('find', async function (this: any, next: any): Promise<void> {
  console.log(bold(red(`[${CollectionName}-Find][Pre] `)))
  this.password = await GenerateHash(this.password)
  if (!this.password) console.log(bold(red(`Password Decoding Error`)))
  else console.log(bold(yellow(`Password Decoded`)))
  next()
})
scheme.post('find', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Find][Post] `)))
})

scheme.pre('findOne', function (): void {
  console.log(bold(red(`[${CollectionName}-FindOne][Pre] `)))
})
scheme.post('findOne', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-FindOne][Post] `)))
})

scheme.pre('save', function (): void {
  console.log(bold(red(`[${CollectionName}-Save][Pre] `)))
})
scheme.post('save', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Save][Post] `)))
})

scheme.pre('validate', function (): void {
  console.log(bold(red(`[${CollectionName}-Validate][Pre] `)))
})
scheme.post('validate', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Validate][Post] `)))
})

scheme.pre('remove', function (): void {
  console.log(bold(red(`[${CollectionName}-Remove][Pre] `)))
})
scheme.post('remove', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Remove][Post] `)))
})

scheme.pre('update', function (): void {
  console.log(bold(red(`[${CollectionName}-Update][Pre] `)))
})
scheme.post('update', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Update][Post] `)))
})

scheme.pre('delete', function (): void {
  console.log(bold(red(`[${CollectionName}-Delete][Pre] `)))
})
scheme.post('delete', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-Delete][Post] `)))
})

scheme.pre('deleteOne', function (): void {
  console.log(bold(red(`[${CollectionName}-DeleteOne][Pre] `)))
})
scheme.post('deleteOne', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-DeleteOne][Post] `)))
})

scheme.pre('deleteMany', function (): void {
  console.log(bold(red(`[${CollectionName}-DeleteMany][Pre] `)))
})
scheme.post('deleteMany', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-DeleteMany][Post] `)))
})

scheme.pre('findByIdAndUpdate', function (): void {
  console.log(bold(red(`[${CollectionName}-FindByIdAndUpdate][Pre] `)))
})
scheme.post('findByIdAndUpdate', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-FindByIdAndUpdate][Post] `)))
})

scheme.pre('insertMany', function (): void {
  console.log(bold(red(`[${CollectionName}-InsertMany][Pre] `)))
})
scheme.post('insertMany', function (docs: any): void {
  console.log(bold(green(`[${CollectionName}-InsertMany][Post] `)))
})

const Collection: any = model(CollectionName, scheme)

module.exports = Collection
