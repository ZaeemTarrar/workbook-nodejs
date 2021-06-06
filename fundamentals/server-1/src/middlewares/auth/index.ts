import jwt from 'jsonwebtoken'
const { JWT_KEY } = require('./../../configurations/index')
const RES = require('./../../utils/response')

module.exports.tokenAuth = (req: any, res: any, next: any) => {
  try {
    let token: string | null = req.headers.authorization ?? null
    if (token != null) {
      token = token.split(' ')[1] // Bearer <token>
      jwt.verify(token, JWT_KEY, (err: any, decoded: any) => {
        if (err) {
          res.json(RES(403, 'Decoding Error !'))
        } else {
          // res.json(RES(200, "Successfull !", decoded));
          next()
        }
      })
    } else {
      token = null
      res.json(RES(403, 'No Token Provided !'))
    }
  } catch (err) {
    res.json(RES(403, 'Authentication Crashed Error'))
  }
}
