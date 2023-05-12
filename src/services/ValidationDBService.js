'use strict'

const OperationError = require('../OperationError')

class ValidationDBService {
  constructor(logger, Model) {
    this._logger  = logger
    this._Model   = Model
  }

  async validateAllRecordExists(ids, modelName) {
    if (!ids || ids.length === 0) {
      return []
    }

    const records = await this._Model(modelName).find({ _id: { $in: ids } })

    if (ids.length !== records.length) {
      throw new OperationError('NCC-6', { ids, records, modelName })
    }

    return records
  }

  async validateRecordExists(query, modelName) {
    const record = await this._Model(modelName).findOne(query)

    if (!record) {
      const errorContext = { modelName, query }
      throw new OperationError('COM-2', errorContext)
    }

    return record
  }

  async validateRecordDoesNotExists(query, modelName) {
    const record = await this._Model(modelName).findOne(query)

    if (record) {
      const errorContext = { modelName, query }
      throw new OperationError('NCC-7', errorContext)
    }

    return true
  }

}

module.exports = ValidationDBService
