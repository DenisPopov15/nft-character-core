'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const userId = '123'
const auth = createAuth(userId, userRole, testContext())

describe('completeQuest', async () => {
  it('completeQuest (200)', async () => {
    const quest = await factory.create('Quest', { createdBy: userId })

    const endpoint = '/api/completeQuest'
    const params = {}

    const response = await request(global.server)
      .put(endpoint + '?id=' + quest.id)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(200)
  })
})
