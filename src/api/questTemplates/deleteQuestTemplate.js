'use strict'

const { Delete } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class DeleteQuestTemplate extends Delete {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'QuestTemplate')
  }

  async action() {
    this.object = {}
  }
}

module.exports = async (req, res, next) => {
  const operation = new DeleteQuestTemplate({ req, res, next })
  await operation.execute()
}
