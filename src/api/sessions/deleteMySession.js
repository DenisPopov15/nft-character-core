'use strict'

const { Delete } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class DeleteMySession extends Delete {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Session')
  }

  async action() {
    // TODO: Implement logic
    // await this.DbCollection.deleteMany({ _id: this.context.auth.sessionId })
    // await invalidateInRedis()
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new DeleteMySession({ req, res, next })
  await operation.execute()
}
