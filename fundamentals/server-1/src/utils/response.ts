import { green, gray, red, yellow, bold, blue } from 'colors'
import status, {
  OK,
  CREATED,
  NOT_MODIFIED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  METHOD_NOT_ALLOWED,
  NO_CONTENT,
} from 'http-status'
const { ShowVisualLogsForEveryRequest } = require('./../configurations/index')
const { CreateResponseLog } = require('./logs')

module.exports = (
  code: number,
  msg: string | null = null,
  data: object | any | null = null,
): object | any => {
  let R: object = {
    response: {
      code: <number>code,
      status: <string>status[code],
      message: <string | null>msg,
      data: <any>data,
    },
  }
  if (ShowVisualLogsForEveryRequest) {
    switch (code) {
      case OK:
      case CREATED:
        {
          console.log(
            bold(green(`Response: `)),
            bold(yellow(JSON.stringify(R, null, 3))),
          )
        }
        break
      case METHOD_NOT_ALLOWED:
      case BAD_REQUEST:
      case NOT_FOUND:
      case INTERNAL_SERVER_ERROR:
      case NOT_MODIFIED:
        {
          console.log(
            bold(red(`Response: `)),
            bold(gray(JSON.stringify(R, null, 3))),
          )
        }
        break
      case NO_CONTENT:
        {
          console.log(
            bold(blue(`Response: `)),
            bold(gray(JSON.stringify(R, null, 3))),
          )
        }
        break
      default: {
        console.log(
          bold(blue(`Response: `)),
          bold(gray(JSON.stringify(R, null, 3))),
        )
      }
    }
  }
  CreateResponseLog(R)
  return R
}
