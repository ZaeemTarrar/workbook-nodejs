export {}

/**
 * Imports
 */
import { Request, Response } from 'express'
import { BAD_REQUEST, OK } from 'http-status'
import assert from 'assert'
const { SUCCESS, ERROR, WARNING }: any = require('./../static/Message/index')
const ApiTools: any = require('./../libraries/ApiTools/index')
const RolesCollection: any = require('./../models/role')

/**
 * All Roles
 */
module.exports.fetchAll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const roles: any = await RolesCollection.collectAll()
    ApiTools.set(OK, [SUCCESS, 'List of All Roles'], { roles }).show().send()
  } catch (err) {
    ApiTools.set(BAD_REQUEST, [ERROR, (<Error>err).message], null)
      .show()
      .send()
  }
}

/**
 * Single Role
 */
module.exports.fetchOne = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    assert(req.params.id, 'Role `id` is not provided')
    const role: any = await RolesCollection.collectOne(req.params.id)
    ApiTools.set(OK, [SUCCESS, 'Role Found'], { role }).show().send()
  } catch (err) {
    if ((<Error | any>err).code === 'ERR_ASSERTION')
      ApiTools.set(BAD_REQUEST, [WARNING, (<Error>err).message], null)
        .show()
        .send()
    else
      ApiTools.set(BAD_REQUEST, [ERROR, (<Error>err).message], err)
        .show()
        .send()
  }
}

/**
 * All Roles with Relations and Extra Details
 */
module.exports.fetchAllExtra = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const roles: any = await RolesCollection.CollectAll()
    ApiTools.set(OK, [SUCCESS, 'List of All Roles'], { roles }).show().send()
  } catch (err) {
    ApiTools.set(BAD_REQUEST, [ERROR, (<Error>err).message], null)
      .show()
      .send()
  }
}

/**
 * All Roles with Relations and Extra Details
 */
module.exports.fetchOneExtra = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    assert(req.params.id, 'Role `id` is not provided')
    const role: any = await RolesCollection.CollectOne(req.params.id)
    ApiTools.set(OK, [SUCCESS, 'Role Found'], { role }).show().send()
  } catch (err) {
    if ((<Error | any>err).code === 'ERR_ASSERTION')
      ApiTools.set(BAD_REQUEST, [WARNING, (<Error>err).message], null)
        .show()
        .send()
    else
      ApiTools.set(BAD_REQUEST, [ERROR, (<Error>err).message], err)
        .show()
        .send()
  }
}
