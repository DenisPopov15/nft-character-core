'use strict'

const jwt = require('jsonwebtoken')
const DEFAULT_EXP_IN_SECONDS = 60 * 15
let { SERVICE_PRIVATE_KEY } = process.env
const { authIssuer, authAudience } = require('./const')

const createAuth = (userId, role, context) => {
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = now + DEFAULT_EXP_IN_SECONDS

  const payload = {
    iss    : authIssuer,
    aud    : authAudience,
    exp    : expiresAt,
    userId,
    type   : 'auth',
  }

  if (role) {
    payload.role = role
  }

  if (context) {
    Object.assign(payload, context)
  }

  SERVICE_PRIVATE_KEY = SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n')
  const token = jwt.sign(payload, SERVICE_PRIVATE_KEY, { algorithm: 'RS256' })

  return token
}

module.exports = createAuth
