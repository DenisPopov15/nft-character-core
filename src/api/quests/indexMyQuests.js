'use strict'

const { Index } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class IndexMyQuests extends Index {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'Quest')
  }

  async action() {
    this.objects = []
  }
}

module.exports = async (req, res, next) => {
  const operation = new IndexMyQuests({ req, res, next })
  await operation.execute()
}
