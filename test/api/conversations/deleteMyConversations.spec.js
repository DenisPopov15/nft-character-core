'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const auth = createAuth(createdBy, userRole, testContext)

describe('deleteMyConversations', async () => {
  it('deleteMyConversations (204)', async () => {
    const conversation = await factory.create('Conversation', { createdBy })
    const { nftCharacterId } = conversation

    const endpoint = '/api/deleteMyConversations'

    const response = await request(global.server)
      .delete(endpoint + '?nftCharacterId=' + nftCharacterId)
      .set('auth', auth)
      .send()

    expect(response.status).to.be.equal(204)
    const conversations = await api.Model('Conversation').find({ nftCharacterId })
    expect(conversations.length).to.be.equal(0)
  })
})
