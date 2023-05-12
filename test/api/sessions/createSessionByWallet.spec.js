'use strict'

const { expect }  = require('chai')
const request     = require('supertest')
// const { factory } = require('factory-girl')
const jwt         = require('jsonwebtoken')

const signWithWallet = require('../../_signWithWallet')

const { LOGIN_PAYLOAD } = require('../../../src/helpers/const')
const { TEST_TOKEN_ID, TEST_TOKEN_URL, TEST_NFT_ADDRESS } = process.env
const MILISECONDS_IN_SECONDS = 1000

describe('createSessionByWallet', async () => {
  it('createSessionByWallet (201)', async () => {
    const payload = LOGIN_PAYLOAD

    const now       = Date.now()
    const expiresAt = now + (30 * MILISECONDS_IN_SECONDS)
    const digest = JSON.stringify({ expiresAt, payload })

    const { signature, walletAddress } = await signWithWallet(digest)

    const endpoint = '/api/createSessionByWallet'

    const response = await request(global.server)
      .post(endpoint)
      .send({ digest, signature, nftCollectionAddress: TEST_NFT_ADDRESS })

    expect(response.status).to.be.equal(201)

    const decoded = jwt.decode(response.body.token)
    expect(decoded.userId).to.be.equal(walletAddress)
    expect(decoded.nfts[0].id).to.be.equal(TEST_TOKEN_ID)
    expect(response.body.nfts[0].id).to.be.equal(TEST_TOKEN_ID)
    expect(response.body.nfts[0].url).to.be.equal(TEST_TOKEN_URL)
  })
})
