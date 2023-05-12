'use strict'

const { expect } = require('chai')
const request = require('supertest')
// const { factory } = require('factory-girl')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const { TEST_TOKEN_ID, TEST_NFT_ADDRESS } = process.env

const createdBy = '123'
const auth = createAuth(createdBy, userRole, testContext())

describe('createNftCharacterStory', async () => {
  it('createNftCharacterStory (201)', async () => {
    const endpoint = '/api/createNftCharacterStory'

    const params = {
      nftCollectionAddress: TEST_NFT_ADDRESS,
      nftId: TEST_TOKEN_ID,
    }

    const response = await request(global.server)
      .post(endpoint)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(201)
  })
})
