'use strict'

const { Update } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class CompleteQuest extends Update {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Quest')
  }

  async action() {
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new CompleteQuest({ req, res, next })
  await operation.execute()
}
