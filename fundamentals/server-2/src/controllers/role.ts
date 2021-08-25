export {}
import { Request, Response } from 'express'
import { BAD_REQUEST, OK } from 'http-status'
const { SUCCESS, ERROR }: any = require('./../static/Message/index')
import { bold, red, gray } from 'colors'
const ApiTools: any = require('./../libraries/ApiTools/index')
const RolesCollection: any = require('./../models/role')

module.exports.fetchAll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const roles: any = await RolesCollection.CollectAll()
    ApiTools.set(OK, [SUCCESS, 'All Right'], { roles }).show().send()
  } catch (err) {
    ApiTools.set(BAD_REQUEST, [ERROR, (<Error>err).message], null)
  }
}
