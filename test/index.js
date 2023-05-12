'use strict'

const App = require('../src/App')

before(async () => {
  const app = new App()
  await app.start()

  global.server = app.server
  global.api = app

  if (process.env.ENABLE_MONGODB || process.env.ENABLE_MONGODB === 'true') {
    await app._mongoose.connection.db.dropDatabase()
  }

  require('fs')
    .readdirSync('./test/factories')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => require(`./factories/${file}`))
})

describe('API', () => {
  require('./api/nftCharacters/index.spec')
  require('./api/conversations/index.spec')
  require('./api/quests/index.spec')
  require('./api/questTemplates/index.spec')
  require('./api/sessions/index.spec')
})

describe('Services', () => {
  require('./services/BotService.spec')
  require('./services/PineconeService.spec')
  require('./services/SemanticSearchService.spec')
})

describe('Helpers', () => {
  require('./helpers/createAuth.spec')
})
