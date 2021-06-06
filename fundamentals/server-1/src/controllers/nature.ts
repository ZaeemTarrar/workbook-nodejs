export {}
import { T_Nature } from './../contracts/model/nature'
const Nature = require('./../models/nature')
const R = require('./../utils/response')

module.exports.fetchAll = (req: Request, res: any, next: any) => {
  Nature.findAll()
    .then((result: any) => {
      res.json(R(200, 'Successfull !', result))
    })
    .catch((e: Error) => {
      res.json(R(403, 'Error !'))
    })
}

module.exports.create = (req: any, res: any, next: any) => {
  let nature: T_Nature = {
    name: req?.body?.name,
    active: req?.body?.active,
  }
  Nature.create(nature)
    .then((result: any) => {
      res.json(R(200, 'Successfull !', true))
    })
    .catch((e: Error) => {
      res.json(R(403, 'Error !'))
    })
}

module.exports.remove = (req: any, res: any, next: any) => {
  let id: number = req.params.id as number
  Nature.findAll({
    where: {
      id: id,
    },
  })
    .then((result: any) => {
      if (result.length > 0) {
        return result[0]
      } else {
        return null
      }
    })
    .then((result: any) => {
      if (result != null) {
        result.destroy()
        res.json(R(200, 'Successfull !', true))
      } else {
        res.json(R(403, 'Unknown Data !'))
      }
    })
    .catch((e: Error) => {
      res.json(R(403, 'Error !'))
    })
}

module.exports.update = (req: any, res: any, next: any) => {
  let id: number = req.params.id as number
  let nature: T_Nature = {
    name: req?.body?.name,
    active: req?.body?.active,
  }
  Nature.findAll({
    where: {
      id: id,
    },
  })
    .then((result: any) => {
      if (result.length > 0) {
        return result[0]
      } else {
        return null
      }
    })
    .then((result: any) => {
      if (result != null) {
        result.name = nature.name
        result.active = nature.active
        result.save()
        res.json(R(200, 'Successfull !', true))
      } else {
        res.json(R(403, 'Unknown Data !'))
      }
    })
    .catch((e: Error) => {
      res.json(R(403, 'Error !'))
    })
}
