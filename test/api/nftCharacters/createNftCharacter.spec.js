'use strict'

const { expect } = require('chai')
const request = require('supertest')
const faker = require('faker')
const createAuth = require('../../../src/helpers/createAuth')
const { user: userRole } = require('../../../src/helpers/const')
const testContext = require('../../_testContext')

const { TEST_TOKEN_ID, TEST_NFT_ADDRESS } = process.env

const createdBy = '123'
const auth = createAuth(createdBy, userRole, testContext())

describe('createNftCharacter', async () => {
  it('createNftCharacter (201)', async () => {
    const endpoint = '/api/createNftCharacter'

    const params = {
      nftCollectionAddress: TEST_NFT_ADDRESS,
      nftId: TEST_TOKEN_ID,
      story: faker.datatype.string(),
      // name: faker.datatype.string(),
      // avatarUrl: 'https://example.com/avatar.jpg',
    }

    const response = await request(global.server)
      .post(endpoint)
      .set('auth', auth)
      .send(params)

    expect(response.status).to.be.equal(201)
  })
})
