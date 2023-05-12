'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const myUserAuth = createAuth(createdBy, userRole, testContext)
let nftCharacterId

describe('indexMyConversations', async () => {
  before(async () => {
    const nftCharacter = await factory.create('NftCharacter', { createdBy })
    nftCharacterId = nftCharacter.id

    await Promise.all([
      factory.create('Conversation', { createdBy, nftCharacterId }),
      factory.create('Conversation', { createdBy, nftCharacterId }),
      factory.create('Conversation', { createdBy }),
      factory.create('Conversation'),
    ])
  })

  it('indexMyConversations (200)', async () => {
    const endpoint = '/api/indexMyConversations'

    const response = await request(global.server)
      .get(endpoint)
      .set('auth', myUserAuth)
      .send()

    expect(response.status).to.be.equal(200)

    const conversations = response.body
    expect(conversations.length >= 3).to.be.equal(true)

    const response2 = await request(global.server)
      .get(endpoint + '?nftCharacterId=' + nftCharacterId)
      .set('auth', myUserAuth)
      .send()

    expect(response2.status).to.be.equal(200)

    const conversations2 = response2.body
    expect(conversations2.length === 2).to.be.equal(true)
  })
})
