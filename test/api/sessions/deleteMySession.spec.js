'use strict'

const { expect } = require('chai')
const request    = require('supertest')
const createAuth = require('../../../src/helpers/createAuth')

const userId = '123'
const auth = createAuth(userId)

describe('deleteMySession', async () => {
  it('deleteMySession (204)', async () => {

    const endpoint = '/api/deleteMySession'

    const response = await request(global.server)
      .delete(endpoint)
      .set('auth', auth)
      .send()

    expect(response.status).to.be.equal(204)
  })
})
