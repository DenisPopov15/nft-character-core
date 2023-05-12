'use strict'

const { Create } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class CreateQuestTemplate extends Create {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'QuestTemplate')
  }

  async action() {
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new CreateQuestTemplate({ req, res, next })
  await operation.execute()
}
