'use strict'

const { Index } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class IndexQuestTemplates extends Index {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'QuestTemplate')
  }

  async action() {
    this.objects = []
  }
}

module.exports = async (req, res, next) => {
  const operation = new IndexQuestTemplates({ req, res, next })
  await operation.execute()
}
