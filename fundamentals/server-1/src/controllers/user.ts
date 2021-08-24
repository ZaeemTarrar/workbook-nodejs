export {}
import sequelize, { Op } from 'sequelize'
import { T_User, C_T_User } from './../contracts/model/user'
import {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  OK,
  CREATED,
  BAD_REQUEST,
  METHOD_NOT_ALLOWED,
  NO_CONTENT,
  NOT_MODIFIED,
} from 'http-status'
const { GenerateHash } = require('./../utils/password')

const { CleanBlack } = require('./../utils/objects')
const User = require('./../models/user')
const Profile = require('./../models/profile')
const R = require('./../utils/response')

module.exports.countAll = (req: any, res: any, next: any) => {
  User.count({})
    .then((result: any) => {
      if (result != 0) res.json(R(OK, null, { count: result }))
      else res.json(R(NO_CONTENT, null, result))
    })
    .catch((e: Error) => {
      res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
    })
}

module.exports.fetchAll = (req: any, res: any, next: any) => {
  User.findAll({ attributes: ['id', 'username', 'role'], include: Profile })
    .then((result: any) => {
      if (result.length > 0) res.json(R(OK, null, result))
      else res.json(R(NO_CONTENT, null, result))
    })
    .catch((e: Error) => {
      res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
    })
}

module.exports.filterOne = (req: any, res: any, next: any) => {
  try {
    let id: number = req.params.id
    User.findByPk(id, {
      attributes: ['id', 'username', 'role'],
      include: Profile,
    })
      .then((result: any) => {
        if (result) res.json(R(OK, null, result))
        else res.json(R(NO_CONTENT, null, result))
      })
      .catch((e: Error) => {
        res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}

module.exports.searchOne = (req: any, res: any, next: any) => {
  try {
    let user: T_User = {
      id: req.body.id,
      username: req.body.username,
      role: req.body.role.toUpperCase(),
    }
    user = CleanBlack(user)
    User.findOne({
      attributes: ['id', 'username', 'role'],
      where: { ...user },
      include: Profile,
    })
      .then((result: any) => {
        if (result) res.json(R(OK, null, result))
        else res.json(R(NO_CONTENT, null, result))
      })
      .catch((e: Error) => {
        res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}

module.exports.search = (req: any, res: any, next: any) => {
  try {
    let user: T_User = {
      id: req.body.id,
      username: req.body.username,
      role: req.body.role.toUpperCase(),
    }
    user = CleanBlack(user)
    User.findAll({
      attributes: ['id', 'username', 'role'],
      where: { ...user },
      include: Profile,
    })
      .then((result: any) => {
        if (result.length > 0) res.json(R(OK, null, result))
        else res.json(R(NO_CONTENT, null, result))
      })
      .catch((e: Error) => {
        res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}

module.exports.create = (req: any, res: any, next: any) => {
  try {
    GenerateHash(req?.body?.password)
      .then((pass: string) => {
        let user: C_T_User = {
          username: req.body.username,
          password: pass,
          role: req.body.role.toUpperCase(),
        }
        User.create(user)
          .then((result: any) => {
            res.json(R(CREATED, null, result))
          })
          .catch((e: Error) => {
            res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
          })
      })
      .catch((e: Error) => {
        res.json(
          R(BAD_REQUEST, `Password Promise - Error: ${e.message || null}`),
        )
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}

module.exports.remove = (req: any, res: any, next: any) => {
  try {
    let id: number = Number(req?.params?.id)
    User.findAll({ where: { id } })
      .then((result: any) => {
        return result[0] || undefined
      })
      .then((result: any) => {
        if (result) {
          result.destroy()
          res.json(R(OK, 'Item Deleted'))
        } else {
          res.json(R(METHOD_NOT_ALLOWED, `No Item Found, To Be Removed`))
        }
      })
      .catch((e: Error) => {
        res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}

module.exports.update = (req: any, res: any, next: any) => {
  try {
    let id: number = Number(req?.params?.id)
    let user: any = {
      username: req.body.username,
      role: req.body.role.toUpperCase(),
    }
    user = CleanBlack(user)
    User.findAll({ where: { id } })
      .then((result: any) => {
        return result[0] || undefined
      })
      .then((result: any) => {
        if (result) {
          for (let prop in user) {
            if (user.hasOwnProperty(prop)) result[prop] = user[prop]
          }
        }
        return result
      })
      .then((result: any): void => {
        if (result) {
          result.save()
          res.json(R(OK, `Item Updated`))
        } else {
          res.json(R(METHOD_NOT_ALLOWED, 'No Item Found, To Be Updated'))
        }
      })
      .catch((e: Error) => {
        res.json(R(NOT_MODIFIED, `Promise - Error: ${e.message || null}`))
      })
  } catch (err) {
    res.json(
      R(BAD_REQUEST, `Try Catch - Error: ${(err as Error).message || null}`),
    )
  }
}
