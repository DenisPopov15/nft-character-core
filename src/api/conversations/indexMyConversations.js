'use strict'

const { Index } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class IndexMyConversations extends Index {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Conversation')
  }

  before() {
    this.query.createdBy = this.userId

    const { nftCharacterId, sessionId } = this.variables
    if (nftCharacterId) {
      this.query.nftCharacterId = nftCharacterId
    }

    if (sessionId) {
      this.query.sessionId = sessionId
    }
  }

}

module.exports = async (req, res, next) => {
  const operation = new IndexMyConversations({ req, res, next })
  await operation.execute()
}
