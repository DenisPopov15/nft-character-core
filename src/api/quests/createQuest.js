'use strict'

const { Create } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class CreateQuest extends Create {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Quest')
  }

  async action() {
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new CreateQuest({ req, res, next })
  await operation.execute()
}
