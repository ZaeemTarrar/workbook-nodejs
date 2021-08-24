const fs = require('fs')
const { bold, red, green, blue, yellow, gray, magenta } = require('colors')
const resolve = require('path').resolve

const FilePath = resolve('./src/logs/index.log')
const RequestsFilePath = resolve('./src/logs/requests.log')
const ResponsesFilePath = resolve('./src/logs/responses.log')

const CreateRequestLog: Function = (
  method: string,
  date: string,
  time: string,
  protocol: string,
  client: string,
  url: string,
  body: object,
  params: object,
): void => {
  try {
    fs.readFile(RequestsFilePath, 'utf8', (error: any, result: any) => {
      if (!error) {
        let Content =
          result +
          `
			<=====================================>
		
			Method: ${method}
			Date: ${date}
			Time: ${time}
			Client Ip: ${client}
			Complete Url: ${url}
			Body: ${JSON.stringify(body)}
			Params: ${JSON.stringify(params)}
		
			<=====================================>
			`
        fs.writeFile(RequestsFilePath, Content, (err: Error) => {
          if (err) {
            console.log(
              bold(red(`Write File - Log File Error: `)),
              bold(gray(err.message)),
            )
          } else {
            console.log(bold(green(`Request Logs Saved`)))
          }
        })
      }
    })
  } catch (err) {
    console.log(
      bold(red(`Try Catch - Log File Error: `)),
      bold(gray((err as Error).message)),
    )
  }
}

const CreateResponseLog: Function = (data: object | any): void => {
  try {
    let json_data = JSON.stringify(data, null, 3)
    fs.readFile(ResponsesFilePath, 'utf8', (error: any, result: any) => {
      if (!error) {
        let Content =
          result +
          `
		<=====================================>
	
		${json_data}
	
		<=====================================>
		`
        return fs.writeFile(ResponsesFilePath, Content, (err: Error) => {
          if (err) {
            return console.log(
              bold(red(`Write File - Log File Error: `)),
              bold(gray(err.message)),
            )
          }
          console.log(bold(green(`Response Logs Saved`)))
        })
      }
    })
  } catch (err) {
    console.log(
      bold(red(`Try Catch - Log File Error: `)),
      bold(gray((err as Error).message)),
    )
  }
}

const ClearLogs: Function = (): void => {
  try {
    const Chain: Promise<void> = new Promise<void>((resolve, reject) =>
      resolve(),
    )
    Chain.then(() => {
      return fs.writeFile(FilePath, '', (err: Error) => {
        if (err) {
          return console.log(
            bold(red(`Write File - Clearing Main Log File Error: `)),
            bold(gray(err.message)),
          )
        }
        console.log(bold(magenta(`All Pervious Main Logs are Cleared`)))
      })
    })
      .then(() => {
        return fs.writeFile(RequestsFilePath, '', (err: Error) => {
          if (err) {
            return console.log(
              bold(red(`Write File - Clearing Request Log File Error: `)),
              bold(gray(err.message)),
            )
          }
          console.log(bold(magenta(`All Pervious Request Logs are Cleared`)))
        })
      })
      .then(() => {
        return fs.writeFile(ResponsesFilePath, '', (err: Error) => {
          if (err) {
            return console.log(
              bold(red(`Write File - Clearing Response Log File Error: `)),
              bold(gray(err.message)),
            )
          }
          console.log(bold(magenta(`All Pervious Response Logs are Cleared`)))
        })
      })
      .catch((err: Error) => {
        console.log(
          bold(red(`Promise - Clearing Logs Error: `)),
          bold(gray(err.message)),
        )
      })
  } catch (err) {
    console.log(
      bold(red(`Try Catch - Clearing Logs Error: `)),
      bold(gray((err as Error).message)),
    )
  }
}

module.exports = {
  CreateRequestLog,
  CreateResponseLog,
  ClearLogs,
}
