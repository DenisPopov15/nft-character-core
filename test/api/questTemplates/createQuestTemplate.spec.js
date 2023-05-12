'use strict'

const { expect } = require('chai')
const request = require('supertest')
// const { factory } = require('factory-girl')
const faker = require('faker')
const createAuth = require('../../../src/helpers/createAuth')

const createdBy = '123'
const auth = createAuth(createdBy)

describe('createQuestTemplate', async () => {
  it('createQuestTemplate (201)', async () => {
    const endpoint = '/api/createQuestTemplate'

    const params = {
      title: faker.lorem.text(),
      description: faker.lorem.paragraph(),
      tasks: [],
      type: 'quiz',
    }

    const response = await request(global.server)
      .post(endpoint)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(201)
  })
})
