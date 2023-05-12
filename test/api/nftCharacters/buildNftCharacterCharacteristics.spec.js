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

describe('buildNftCharacterCharacteristics', async () => {
  it('buildNftCharacterCharacteristics (200)', async () => {
    const endpoint = '/api/buildNftCharacterCharacteristics'

    const nftCollectionAddress = TEST_NFT_ADDRESS
    const nftId = TEST_TOKEN_ID

    const response = await request(global.server)
      .get(endpoint + '?nftCollectionAddress=' + nftCollectionAddress + '&nftId=' + nftId)
      .set('auth', auth)
      .send()

    expect(response.status).to.be.equal(200)
    expect(response.body.characteristics).to.be.not.undefined
  })
})
