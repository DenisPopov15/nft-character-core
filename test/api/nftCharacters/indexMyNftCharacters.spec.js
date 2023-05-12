'use strict'

const { expect } = require('chai')
const request = require('supertest')
const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const createdBy = '123'
const myUserAuth = createAuth(createdBy, userRole, testContext())

describe('indexMyNftCharacters', async () => {
  before(async () => {
    await Promise.all([
      factory.create('NftCharacter', { createdBy }),
      factory.create('NftCharacter', { createdBy }),
      factory.create('NftCharacter', { createdBy }),
      factory.create('NftCharacter'),
    ])
  })

  it('indexMyNftCharacters (200)', async () => {
    const endpoint = '/api/indexMyNftCharacters'

    const response = await request(global.server)
      .get(endpoint)
      .set('auth', myUserAuth)
      .send()

    expect(response.status).to.be.equal(200)

    const nftCharacters = response.body
    expect(nftCharacters.length >= 3).to.be.equal(true)
  })
})
