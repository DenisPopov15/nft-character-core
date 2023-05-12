'use strict'

const { expect } = require('chai')
const SemanticSearchService = require('../../src/services/SemanticSearchService')
const indexName = 'test'
const indexDimension = 4

const semanticSearchService = new SemanticSearchService(console, indexName, indexDimension)
const namespace = 'test-wow-namespace'

describe('SemanticSearchService', async () => {
  before(async () => {
    await semanticSearchService.init()
  })

  it.skip('.storeConversations', async () => {
    const conversations = [
      { query: 'I like Music', response: 'Cool, me too.' },
      { query: 'My favorite movie is Limitless', response: 'Bradely Cooper is a star' },
      { query: 'Which music do you like', response: 'Jazz, Louis armstrong is the best' },
    ]
    const response = await semanticSearchService.storeConversations(conversations, namespace)

    expect(response).to.be.not.undefined
  })
})
