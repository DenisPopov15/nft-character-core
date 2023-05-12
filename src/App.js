'use strict'

const { App: CommonApp } = require('common-backend-js')
const mongoose = require('mongoose')
const operations = require('./api/index')
const { authenticationTokenMiddleware } = require('./middleware/auth')

const { PORT, MONGODB_URI, ENABLE_MONGODB } = process.env

const allowedHeaders = ['content-type', 'auth', 'accept']
const origin = false
const server = { port: PORT, cors: { allowedHeaders, origin } }

const security = { authenticationToken: authenticationTokenMiddleware }
const formats = [{ name: 'json', pattern: /[^\\"]*/ }]

const config = { security, server, formats }

class App extends CommonApp {
  constructor() {
    super(config, operations)
  }

  async connectMongoDB() {
    console.info('> connectMongoDB') // eslint-disable-line
    await mongoose.connect(MONGODB_URI)
    require('./models/index')

    this._mongoose = mongoose
    this._Model = mongoose.model
  }

  async initialize() {
    if (ENABLE_MONGODB || ENABLE_MONGODB === 'true') {
      await this.connectMongoDB()
    }

    await super.initialize()
  }
}

module.exports = App
