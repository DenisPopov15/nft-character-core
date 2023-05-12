'use strict'

const { expect } = require('chai')
const BotService = require('../../src/services/BotService')

const botService = new BotService(console)

describe('BotService', async () => {
  it('.askWithContext', async () => {
    const response = await botService.askWithContext('How many apples Bob have?')

    expect(response).to.be.not.undefined
  })
})
