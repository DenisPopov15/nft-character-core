'use strict'

const { Create } = require('common-backend-js').operations
const ValidationDBService = require('../../services/ValidationDBService')
const BotService = require('../../services/BotService')
const SemanticSearchService = require('../../services/SemanticSearchService')
// const OperationError = require('../../OperationError')

class CreateConversation extends Create {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Conversation')
  }

  async before() {
    const { nftCharacterId, query } = this.parameters
    const { sessionId } = this.context.auth

    const validationDBService = new ValidationDBService(this.logger, this.Model)
    const nftCharacter = await validationDBService.validateRecordExists({ _id: nftCharacterId }, 'NftCharacter')

    const dbQuery = { createdBy: this.userId, sessionId }
    const conversations = await this.Model('Conversation').find(dbQuery).sort({ updatedAt: 1 })

    const botService = new BotService(this.logger)
    botService.setCharacter(nftCharacter)
    await botService.setShortMemory(conversations)

    const semanticSearchService = new SemanticSearchService(this.logger)
    await semanticSearchService.init()
    const nameSpace = `${nftCharacterId}-${this.userId}`
    const contextDocuments = await semanticSearchService.search(query, nameSpace)

    botService.setContextMemory(contextDocuments)

    const response = await botService.askWithContext(query)

    this.parameters.sessionId = sessionId
    this.parameters.createdBy = this.userId
    this.parameters.response = response
  }

}

module.exports = async (req, res, next) => {
  const operation = new CreateConversation({ req, res, next })
  await operation.execute()
}
