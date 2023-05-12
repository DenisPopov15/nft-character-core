'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const auth = createAuth(createdBy, userRole, testContext)

describe('createConversation', async () => {
  it('createConversation (201)', async () => {
    const { sessionId } = testContext

    const endpoint = '/api/createConversation'

    const nftCharacter = await factory.create('NftCharacter', { createdBy })
    await factory.create('Conversation', { createdBy, sessionId, query: '1' })
    await factory.create('Conversation', { createdBy, sessionId, query: '2' })
    await factory.create('Conversation', { createdBy, sessionId, query: 'How many starts at the sky?', response: 'I do not know.' })

    const params = {
      nftCharacterId: nftCharacter.id,
      query: 'What my previous question was?',
    }

    const response = await request(global.server)
      .post(endpoint)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(201)
  })
})
