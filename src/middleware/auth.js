'use strict'

const jwt = require('jsonwebtoken')
const OperationError = require('../OperationError')
const { authIssuer, authAudience } = require('../helpers/const')

let { SERVICE_PUBLIC_KEY } = process.env
SERVICE_PUBLIC_KEY = SERVICE_PUBLIC_KEY.replace(/\\n/g, '\n')

const authenticationTokenMiddleware = (req, res, next) => {
  let decoded
  try {
    const token = req.headers['auth']
    if (!token) {
      throw new OperationError('COM-3')
    }
    decoded = jwt.verify(token, SERVICE_PUBLIC_KEY)
    const { iss, type, aud } = decoded
    if (iss !== authIssuer || aud !== authAudience || type !== 'auth') {
      throw new OperationError('COM-5')
    }
  } catch (error) {
    let operationError = error
    if (!operationError.code) {
      operationError = new OperationError('COM-5')
    }

    next(operationError)
  }

  req.context = req.context || {}
  req.context.auth = decoded

  next()
}

module.exports = { authenticationTokenMiddleware }
