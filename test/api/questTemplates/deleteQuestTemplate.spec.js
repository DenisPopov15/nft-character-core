'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')

const createdBy = '123'
const auth = createAuth(createdBy)

describe('deleteQuestTemplate', async () => {
  it('deleteQuestTemplate (204)', async () => {
    const questTemplate = await factory.create('QuestTemplate', { createdBy })

    const endpoint = '/api/deleteQuestTemplate'

    const response = await request(global.server)
      .delete(endpoint + '?id=' + questTemplate.id)
      .set('auth', auth)
      .send()

    expect(response.status).to.be.equal(204)
  })
})
