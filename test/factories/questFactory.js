'use strict'

const faker = require('faker')
const { factory } = require('factory-girl')

const { Model } = api

factory.define('Quest', Model('Quest'), {
  nftCharacterId  : () => faker.datatype.string(),
  questTemplateId : () => faker.datatype.string(),
  title           : () => faker.lorem.text(),
  description     : () => faker.lorem.paragraph(),
  tasks           : () => [],
  accomplishments : () => [],
  progressDetails : () => faker.datatype.string(),
  sessionId       : () => faker.datatype.string(),
  type            : () => 'quiz',
  state           : () => 'pending',
  createdBy       : () => faker.datatype.string(),
})
