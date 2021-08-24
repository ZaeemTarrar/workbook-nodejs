export {}
import sequelize, { Op } from 'sequelize'
import { T_Profile, C_T_Profile } from './../contracts/model/profile'
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

const { CleanBlack } = require('./../utils/objects')
const Profile = require('./../models/profile')
const R = require('./../utils/response')

module.exports.countAll = (req: any, res: any, next: any) => {
  Profile.count({})
    .then((result: any) => {
      if (result != 0) res.json(R(OK, null, { count: result }))
      else res.json(R(NO_CONTENT, null, result))
    })
    .catch((e: Error) => {
      res.json(R(BAD_REQUEST, `Promise - Error: ${e.message || null}`))
    })
}

module.exports.fetchAll = (req: any, res: any, next: any) => {
  Profile.findAll({})
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
    let id: number = Number(req?.params?.id)
    Profile.findByPk(id)
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
    let profile: T_Profile = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      snap: req.body.snap,
    }
    profile = CleanBlack(profile)
    Profile.findOne({ where: { ...profile } })
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
    let profile: T_Profile = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      snap: req.body.snap,
    }
    profile = CleanBlack(profile)
    Profile.findAll({ where: { ...profile } })
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
    let profile: C_T_Profile = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      snap: req.body.snap,
      userId: req.body.userId,
    }
    profile = CleanBlack(profile)
    Profile.create(profile)
      .then((result: any) => {
        res.json(R(CREATED, null, result))
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

module.exports.remove = (req: any, res: any, next: any) => {
  try {
    let id: number = Number(req?.params?.id)
    Profile.findAll({ where: { id } })
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
    let profile: T_Profile | any = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      snap: req.body.snap,
    }
    profile = CleanBlack(profile)
    Profile.findAll({ where: { id } })
      .then((result: any) => {
        return result[0] || undefined
      })
      .then((result: any) => {
        if (result) {
          for (let prop in profile) {
            if (profile.hasOwnProperty(prop)) result[prop] = profile[prop]
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

module.exports.updateByUser = (req: any, res: any, next: any) => {
  try {
    let userId: number = Number(req?.params?.userId)
    let profile: any = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      snap: req.body.snap,
    }
    profile = CleanBlack(profile)
    Profile.findAll({ where: { userId } })
      .then((result: any) => {
        return result[0] || undefined
      })
      .then((result: any) => {
        if (result) {
          for (let prop in profile) {
            if (profile.hasOwnProperty(prop)) result[prop] = profile[prop]
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
