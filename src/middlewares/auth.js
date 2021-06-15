const jwt = require('jsonwebtoken')
const { response: standardResponse } = require('../helpers/standardResponse')

const auth = (req, res, next) => {
  if (req.headers?.authorization) {
    if (req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.slice(7)
        const user = jwt.verify(token, process.env.APP_KEY)
        req.authUser = user
        next()
      } catch (err) {
        return standardResponse(res, 401, false, 'You must be login first!')
      }
    } else {
      return standardResponse(res, 401, false, 'Auth token needed!')
    }
  } else {
    return standardResponse(res, 401, false, 'Auth token needed!')
  }
}

module.exports = auth
