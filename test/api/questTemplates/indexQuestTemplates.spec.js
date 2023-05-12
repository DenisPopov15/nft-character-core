'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')

const createdBy = '123'
const myUserAuth = createAuth(createdBy)

describe('indexQuestTemplates', async () => {
  before(async () => {
    await Promise.all([
      factory.create('QuestTemplate', { createdBy }),
      factory.create('QuestTemplate', { createdBy }),
      factory.create('QuestTemplate', { createdBy }),
      factory.create('QuestTemplate'),
    ])
  })

  it('indexQuestTemplates (200)', async () => {
    const endpoint = '/api/indexQuestTemplates'

    const response = await request(global.server)
      .get(endpoint)
      .set('auth', myUserAuth)
      .send()

    expect(response.status).to.be.equal(200)

    // const questTemplates = response.body
    // expect(questTemplates.length >= 3).to.be.equal(true)
  })
})
