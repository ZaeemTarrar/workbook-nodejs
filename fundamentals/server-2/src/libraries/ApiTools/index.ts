import { NextFunction, Request, RequestHandler, Response } from 'express'
import status from 'http-status'
import { bold, red, yellow, blue, cyan, green, magenta, gray } from 'colors'
const Configurations: any = require('./../../configurations/index')
const { AppServer }: any = Configurations

class ApiTools {
  private responseFormat: {
    code: number
    status: string
    message:
      | string
      | {
          type: string
          text: string
        }
    data: any
  } | null = null
  private responseObject: Response | null = null
  private requestObject: Request | null = null
  private SAVE: object | any = {
    DATABASE: 'DATABASE',
    FILE: 'FILE',
  }

  /**
   * Constructor
   */
  public constructor() {}

  /**
   * Method to Attach API Response Object
   */
  public attach: { request: Function; response: Function } = {
    request: (req: Request): ApiTools => {
      this.requestObject = req
      return this
    },
    response: (res: Response): ApiTools => {
      this.responseObject = res
      return this
    },
  }

  /**
   * ApiTools Middleware
   */
  public gate: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    this.requestObject = req
    this.responseObject = res
    console.log(bold(magenta('\n<API-Called>')))
    this.responseObject.on('close', (): void => {
      console.log(bold(magenta('<API-Closed>')))
    })
    next()
  }

  /**
   * Method to Set the API Response
   */
  public set: Function = (code: number, msg: any, data: any): ApiTools => {
    try {
      let messageFormat: any = null
      if (typeof msg === 'string') {
        messageFormat = msg
      } else if (Array.isArray(msg)) {
        messageFormat = {
          type: msg[0].toString(),
          text: msg[1].toString(),
        }
      } else {
        messageFormat = null
      }
      this.responseFormat = {
        code,
        status: String(status[code]),
        message: messageFormat,
        data,
      }
    } catch (err) {
      console.log(
        bold(red('Response Formatting Error: ')),
        bold(gray((<Error>err).message)),
      )
      this.responseFormat = null
    }
    return this
  }

  /**
   * Method to Send Back the API Response
   */
  public send: Function = (): ApiTools => {
    if (this.responseObject === null || this.responseFormat === null)
      throw new Error('API Response was Not Set')
    this.responseObject
      .status(this.responseFormat?.code || 200)
      .json(this.responseFormat)
    return this
  }

  /**
   * Method to Save Response Logs
   */
  public show: Function = (
    req: boolean = true,
    res: boolean = true,
  ): ApiTools => {
    if (req) {
      /**
       * Request Data Extraction
       */
      const {
        method,
        body,
        params,
        url,
        ip,
        protocol,
        originalUrl,
      }: any = this.requestObject

      /**
       * Request Console Logs
       */
      console.log(
        bold(magenta(`[Request]: `)),
        bold(blue(method)),
        bold(
          gray(`${protocol}://${AppServer.IpAddress}:${AppServer.Port}`) +
            green(`${originalUrl}`),
        ),
        bold(cyan(`${ip}`)),
      )
      console.log(
        bold(blue(`Data: `)),
        bold(cyan(JSON.stringify({ Params: params, Body: body }, null, 3))),
      )
    }

    if (res) {
      /**
       * Response Console Logs
       */
      if (this.responseFormat)
        console.log(
          bold(magenta('[Response]: ')),
          bold(yellow(JSON.stringify(this.responseFormat, null, 3))),
        )
    }

    return this
  }

  /**
   * Method to Save Response Logs
   */
  public save: Function = (type: string): ApiTools => {
    switch (type) {
      case this.SAVE.DATABASE:
        {
          // Code
        }
        break
      case this.SAVE.DATABASE:
        {
          // Code
        }
        break
      default: {
        // Code
      }
    }
    return this
  }
}

const ApiTool: ApiTools = new ApiTools()

module.exports = ApiTool
