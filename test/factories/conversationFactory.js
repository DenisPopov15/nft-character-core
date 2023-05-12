'use strict'

const faker = require('faker')
const { factory } = require('factory-girl')

const { Model } = api

factory.define('Conversation', Model('Conversation'), {
  nftCharacterId : () => faker.datatype.string(),
  query          : () => faker.datatype.string(),
  response       : () => faker.datatype.string(),
  sessionId      : () => faker.datatype.string(),
  createdBy      : () => faker.datatype.string(),
})
