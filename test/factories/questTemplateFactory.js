'use strict'

const faker = require('faker')
const { factory } = require('factory-girl')

const { Model } = api

factory.define('QuestTemplate', Model('QuestTemplate'), {
  title       : () => faker.lorem.text(),
  description : () => faker.lorem.paragraph(),
  tasks       : () => [],
  type        : () => 'quiz',
  createdBy   : () => faker.datatype.string(),
})
