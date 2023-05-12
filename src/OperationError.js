'use strict'

const { OperationError: OpError } = require('common-backend-js')

const root = process.cwd()
const path = `${root}/config/errors.yaml`

const OperationError = OpError.buildOperationErrorClassSync(path)

module.exports = OperationError
