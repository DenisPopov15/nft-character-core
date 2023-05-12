'use strict'

const { Delete } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class DeleteMyConversations extends Delete {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Conversation')
  }

  before() {
    const { nftCharacterId } = this.variables
    this.query = { nftCharacterId }
  }
}

module.exports = async (req, res, next) => {
  const operation = new DeleteMyConversations({ req, res, next })
  await operation.execute()
}
