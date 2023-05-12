'use strict'

const { expect } = require('chai')
const PineconeService = require('../../src/services/PineconeService')
const indexName = 'test'
const indexDimension = 4

const pineconeService = new PineconeService(console, indexName, indexDimension)
const namespace = 'test-wow-namespace'

describe.skip('PineconeService', async () => {
  before(async () => {
    await pineconeService.init()
  })

  it.skip('.createIndex', async () => {
    const response = await pineconeService.createIndex()

    expect(response).to.be.not.undefined
  })

  it.skip('.upsertVectors .findVectors .deleteVectors', async () => {
    const queryVector = [0.1, 0.2, 0.3, 0.4]
    const vectorIds = ['vec1', 'vec2']

    const vectors = [
      {
        id: vectorIds[0],
        values: queryVector,
        metadata: { genre: 'drama' },
      },
      {
        id: vectorIds[1],
        values: [0.2, 0.3, 0.4, 0.5],
        metadata: { genre: 'action' },
      },
    ]
    const response = await pineconeService.upsertVectors(vectors, namespace)
    expect(response).to.be.not.undefined

    const findResponse = await pineconeService.findVectors(queryVector, namespace)
    expect(findResponse).to.be.not.undefined

    const deleteResponse = await pineconeService.deleteVectors(vectorIds, namespace)
    expect(deleteResponse).to.be.not.undefined
  })
})
