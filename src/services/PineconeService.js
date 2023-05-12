'use strict'

// DOCS: https://docs.pinecone.io/docs/node-client

// Hack to embeed fetch which using under the hood at pinecone lib
global.fetch = require('node-fetch')
// const { PineconeStore } = require('langchain/vectorstores')
const { PineconeClient } = require('@pinecone-database/pinecone')
const { PINECONE_ENVIRONMENT, PINECONE_API_KEY } = process.env

const PINECONE_INDEX_NAME = 'wow-test-index'
const PINECONE_INDEX_DIMENSION = 1536
const TOP_MATCH_RESULTS_NUMBER = 3

class PineconeService {
  constructor(logger, indexName, indexDimension) {
    this._logger = logger || console
    this._indexName = indexName || PINECONE_INDEX_NAME
    this._indexDimension = indexDimension || PINECONE_INDEX_DIMENSION

    this._pinecone = new PineconeClient()
  }

  async init() {
    await this._pinecone.init({
      environment: PINECONE_ENVIRONMENT,
      apiKey: PINECONE_API_KEY,
    })

    this._index = this._pinecone.Index(this._indexName)
  }

  async createIndex() {
    const createRequest = {
      name:      this._indexName,
      dimension: this._indexDimension,
    }

    await this._pinecone.createIndex({ createRequest })

    return true
  }

  async deleteIndex() {
    await this._pinecone.deleteIndex({
      indexName: this._indexName,
    })
  }

  async upsertVectors(vectors, namespace) {
    const upsertRequest = {
      vectors,
      namespace
    }

    const response = await this._index.upsert({ upsertRequest })
    return response
  }

  async findVectors(queryVector, namespace) {
    const queryRequest = {
      vector: queryVector,
      topK: TOP_MATCH_RESULTS_NUMBER,
      includeValues: true,
      includeMetadata: true,
      // filter: {
      //   genre: { $in: ["apple", "orange"] },
      // },
      namespace,
    }

    const response = await this._index.query({ queryRequest })
    return response
  }

  async deleteVectors(vectorIds, namespace) {
    const response = await this._index.delete1({
      ids: vectorIds,
      namespace,
    })

    return response
  }
}

module.exports = PineconeService
