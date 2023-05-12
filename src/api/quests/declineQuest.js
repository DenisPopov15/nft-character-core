'use strict'

const { Update } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class DeclineQuest extends Update {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Quest')
  }

  async action() {
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new DeclineQuest({ req, res, next })
  await operation.execute()
}
