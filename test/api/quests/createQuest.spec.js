'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const auth = createAuth(createdBy, userRole, testContext())

describe('createQuest', async () => {
  it('createQuest (201)', async () => {
    const nftCharacter = await factory.create('NftCharacter', { createdBy })
    const questTemplate = await factory.create('QuestTemplate', { createdBy })

    const endpoint = '/api/createQuest'

    const params = {
      nftCharacterId: nftCharacter.id,
      questTemplateId: questTemplate.id,
    }

    const response = await request(global.server)
      .post(endpoint)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(201)
  })
})
