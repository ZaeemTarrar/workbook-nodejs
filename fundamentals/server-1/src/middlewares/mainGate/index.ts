import {
  bold,
  gray,
  magenta,
  yellow,
  blue,
  green,
  cyan,
  red,
  white,
} from 'colors'
const { PORT, IP } = require('./../../configurations/index')
const { CreateRequestLog } = require('./../../utils/logs')
const {
  ShowVisualLogsForEveryRequest,
} = require('./../../configurations/index')

module.exports = (req: any, res: any, next: any): void => {
  var start: any = new Date()
  if (ShowVisualLogsForEveryRequest) {
    let Chain: Promise<void> = new Promise<void>((resolve, reject) => resolve())
    Chain.then((): any => {
      let Method: string = req.method
      let Body: any = req.body
      let Params: any = req.params
      let Url: string = req.url
      let ClientIp: string = req.ip
      let Protocol: string = req.protocol
      let date = new Date()
      let CurrentDate: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      let CurrentTime: string = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      console.log('\n')
      console.log(
        bold(magenta(`Main Gate: `)),
        bold(blue(Method)),
        bold(gray(`http://${IP}:${PORT}`) + green(`${Url}`)),
        bold(cyan(`${ClientIp}`)),
      )
      console.log(
        bold(blue(`Data: `)),
        bold(cyan(JSON.stringify({ Params, Body }, null, 2))),
      )
      return {
        Method,
        CurrentDate,
        CurrentTime,
        Protocol: Protocol || `http`,
        ClientIp,
        Url: `http://${IP}:${PORT}${Url}`,
        Body,
        Params,
      }
    })
      .then(
        ({
          Method,
          CurrentDate,
          CurrentTime,
          Protocol,
          ClientIp,
          Url,
          Body,
          Params,
        }): void => {
          return res.on('close', () => {
            // console.log(bold(blue(`CLOSE`)))
            var end: any = new Date()
            const diffTime = Math.abs(end - start) / 1000.0
            console.log(
              bold(magenta(`Request Duration: `)),
              bold(white(diffTime.toString() + ` seconds`)),
            )
            return CreateRequestLog(
              Method,
              CurrentDate,
              CurrentTime,
              Protocol,
              ClientIp,
              Url,
              Body,
              Params,
            )
          })
        },
      )
      .then((): void => {
        return res.on('finish', () => {
          // console.log(bold(blue(`FINISH`)))
        })
      })
      .then((): void => {
        next()
      })
      .catch((e: Error) => {
        console.log(
          bold(red(`Main Gate Promise Error: `)),
          bold(gray(e.message)),
        )
      })
  } else {
    next()
  }
}
