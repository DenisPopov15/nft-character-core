'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const myUserAuth = createAuth(createdBy, userRole, testContext())

describe('indexMyQuests', async () => {
  before(async () => {
    await Promise.all([
      factory.create('Quest', { createdBy }),
      factory.create('Quest', { createdBy }),
      factory.create('Quest', { createdBy }),
      factory.create('Quest'),
    ])
  })

  it('indexMyQuests (200)', async () => {
    const endpoint = '/api/indexMyQuests'

    const response = await request(global.server)
      .get(endpoint)
      .set('auth', myUserAuth)
      .send()

    expect(response.status).to.be.equal(200)

    // const quests = response.body
    // expect(quests.length >= 3).to.be.equal(true)
  })
})
