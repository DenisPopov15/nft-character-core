'use strict'

const { Index } = require('common-backend-js').operations
// const OperationError = require('../../OperationError')

class IndexMyNftCharacters extends Index {
  constructor({ req, res, next }) {
    super({ req, res, next }, 'NftCharacter')
  }

  before() {
    this.query.createdBy = this.userId
  }
}

module.exports = async (req, res, next) => {
  const operation = new IndexMyNftCharacters({ req, res, next })
  await operation.execute()
}
